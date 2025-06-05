
const popupEdit = document.querySelector(".popup_type_edit");

//открытие
function openPopup() {
  popupEdit.classList.add("popup_is-opened");
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

export { openPopup, closeModal, handleEscape };