export const initPopovers = () => {
  // Convert NodeList to Array of elements with popover attribute
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );

  // Initialize Bootstrap Popovers for each element
  const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  return popoverList;
};
