export function isInTopFocusTrap() {
  // Check if the focus is in the modal
  if (!document.activeElement) {
    return false;
  }

  const topFocusTraps = document.querySelectorAll('.modal, .sortType');
  if (!topFocusTraps) {
    return false;
  }

  topFocusTraps.forEach((topFocusTrap) => {
    if (topFocusTrap.contains(document.activeElement)) {
      return true;
    }
  })

  return false;
}