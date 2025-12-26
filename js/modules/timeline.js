export const initTimeline = () => {
  const timelineItemElements = document.querySelectorAll(".timeline__item");
  const timelineLine = document.querySelector(".timeline__line");
  const timelineSection = document.querySelector("#career-timeline");

  if (!timelineSection) return;

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
