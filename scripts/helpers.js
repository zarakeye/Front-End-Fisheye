/**
 * Checks if the current focus is within a high focus trap element.
 *
 * @return {boolean} True if the focus is within a high focus trap, false otherwise
 */
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