export const initTimeline = () => {
  const timelineItemElements = document.querySelectorAll(".timeline__item");
  const timelineLine = document.querySelector(".timeline__line");
  const timelineTrack = document.querySelector(".timeline__track");
  const timelineSection = document.querySelector("#career-timeline");
  const timelineContainer = document.querySelector(".timeline");

  if (!timelineSection || !timelineTrack || !timelineContainer) return;

  // Function to update track position and size dynamically
  const updateTimelineTrack = () => {
    const markers = document.querySelectorAll(".timeline__marker");
    if (markers.length === 0) return;

    const firstMarker = markers[0];
    const lastMarker = markers[markers.length - 1];
    
    const firstRect = firstMarker.getBoundingClientRect();
    const lastRect = lastMarker.getBoundingClientRect();
    const containerRect = timelineContainer.getBoundingClientRect();

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Vertical Line
      const centerX = firstRect.left - containerRect.left + firstRect.width / 2;
      const startY = firstRect.top - containerRect.top + firstRect.height / 2;
      const endY = lastRect.top - containerRect.top + lastRect.height / 2;
      const height = endY - startY;

      timelineTrack.style.left = `${centerX}px`;
      timelineTrack.style.top = `${startY}px`;
      timelineTrack.style.height = `${height}px`;
      timelineTrack.style.width = '6px';
      timelineTrack.style.transform = 'translateX(-50%)';
      
      // Reset desktop styles
      timelineTrack.style.right = 'auto';
    } else {
      // Horizontal Line
      const startX = firstRect.left - containerRect.left + firstRect.width / 2;
      const endX = lastRect.left - containerRect.left + lastRect.width / 2;
      const width = endX - startX;
      const centerY = firstRect.top - containerRect.top + firstRect.height / 2;

      timelineTrack.style.left = `${startX}px`;
      timelineTrack.style.top = `${centerY}px`;
      timelineTrack.style.width = `${width}px`;
      timelineTrack.style.height = '6px';
      timelineTrack.style.transform = 'translateY(-50%)';
      
      // Reset mobile styles
      timelineTrack.style.bottom = 'auto';
    }
  };

  // Initial update and observers
  requestAnimationFrame(updateTimelineTrack);
  window.addEventListener('resize', updateTimelineTrack);
  
  // Update when items expand/collapse
  const resizeObserver = new ResizeObserver(() => {
    updateTimelineTrack();
  });
  resizeObserver.observe(timelineContainer);

  // Staggered entry animations using Intersection Observer
  const observerOptions = {
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate the connecting line
        if (timelineLine) timelineLine.style.width = "100%";
        if (timelineLine && window.innerWidth <= 992) timelineLine.style.height = "100%";

        // Staggered animation for items
        timelineItemElements.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate");
          }, index * 200);
        });

        // Stop observing after animation triggers
        observer.unobserve(timelineSection);
      }
    });
  }, observerOptions);

  observer.observe(timelineSection);

  // Click-to-expand functionality
  timelineItemElements.forEach((item) => {
    const marker = item.querySelector(".timeline__marker");
    
    marker.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items (accordion behavior)
      timelineItemElements.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherMarker = otherItem.querySelector(".timeline__marker");
        if (otherMarker) otherMarker.title = "Show details";
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
        marker.title = "Hide details";
        
        // Ensure the expanded detail is visible (scroll if needed on mobile)
        if (window.innerWidth <= 992) {
          setTimeout(() => {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 500);
        }
      }
    });

    // Keyboard accessibility
    marker.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        marker.click();
      }
    });
  });
};
