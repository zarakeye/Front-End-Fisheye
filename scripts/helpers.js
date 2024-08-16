export function isInHighFocusTrap() {
  if (!document.activeElement) {
    return false;
  }

  // Check if the focus is in the modal
  const topFocusTraps = document.querySelectorAll('.modal, .sortType');
  if (!topFocusTraps) {
    return false;
  }

  topFocusTraps.forEach((topFocusTrap) => {
    if (topFocusTrap.contains(document.activeElement)) {
      return true;
    }
  })
}