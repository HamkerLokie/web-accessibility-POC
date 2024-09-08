/*

onTabPress -> navigate to the elements in the dom (prefer actionable elements).
onKeyDown -> 1. Enter(behaves click) --> opens the modal and focus shifted to input
                                      traps the tab pressses inside modal
             2. Esc  closes the modal (focus shifts to the open modal button)


Shift + Tab -> traps the focus inside moves from first to last and vice versa
*/

const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('closeModalButton');
const overlay = document.getElementById('overlay');
const focusableElements = 'button, input';
const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // first input element
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // last button element

// Open modal
openModalButton.addEventListener('click', () => {
  modal.classList.add('active');
  overlay.classList.remove('hidden');
  firstFocusableElement.focus(); // Focus on first element in modal
});

// Close modal
function closeModal() {
  modal.classList.remove('active');
  overlay.classList.add('hidden');
  openModalButton.focus(); // Return focus to button that opened modal
}

closeModalButton.addEventListener('click', closeModal);

// Keyboard navigation for modal (trap focus and Esc key to close)
modal.addEventListener('keydown', function (event) {
  let isTabPressed = event.key === 'Tab';

  if (event.key === 'Escape') {
    closeModal();
  }

  if (!isTabPressed) {
    return;
  }

  // If Shift + Tab (backward) pressed and focus is on the first element, move focus to last
  if (event.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      event.preventDefault();
      lastFocusableElement.focus();
    }
  } else {
    // If Tab (forward) pressed and focus is on the last element, move focus to first
    if (document.activeElement === lastFocusableElement) {
      event.preventDefault();
      firstFocusableElement.focus();
    }
  }
});