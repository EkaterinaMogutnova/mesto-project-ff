//открытие

function openPopup(popupElement) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    closeModal(openedPopup);
  }
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

//закрытие
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

const modals = document.querySelectorAll(".popup");
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup__close") ||
      event.target.classList.contains("popup")
    ) {
      closeModal(modal);
    }
  });
});

//Закрытие по Escape
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
function handleOverlayClick(event) {
  if (
    event.target.classList.contains("popup__close") ||
    event.target === event.currentTarget
  ) {
    closeModal(event.currentTarget);
  }
}
export { openPopup, closeModal, handleEscape, handleOverlayClick };
