import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import { openPopup, closeModal, handleEscape } from "./components/modal.js";

const modals = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const newCardPopup = document.querySelector(".popup_type_new-card");
const openCardButton = document.querySelector(".profile__add-button");
const closeCardButton = newCardPopup.querySelector(".popup__close");
const formElementCard = document.querySelector('form[name="new-place"]');
const nameInputPlace = formElementCard.querySelector('[name="place-name"]');
const linkInputPlace = formElementCard.querySelector('[name="link"]');
const placesList = document.querySelector(".places__list");

// Добавляем карточки на страницу
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.append(cardElement);
  });

  //ПЛАВНОЕ ОТКРЫТИЕ
  document.querySelectorAll(".popup").forEach((popup) => {
    if (!popup.classList.contains("popup_is-animated")) {
      popup.classList.add("popup_is-animated");
    }
  });
});

// Обработчик отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Получаем значения из полей ввода
  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме
formElement.addEventListener("submit", handleFormSubmit);

// Функция открытия попапа с картинкой
function openNewCardPopup() {
  newCardPopup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

// Навешиваем обработчики
openCardButton.addEventListener("click", openNewCardPopup);
editButton.addEventListener("click", openPopup);

// Обработчик отправки формы
function handleFormSubmitN(evt) {
  evt.preventDefault();

  // Получаем значения из формы
  const cardName = nameInputPlace.value;
  const cardLink = linkInputPlace.value;

  // Создаем объект с данными новой карточки
  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  // Создаем DOM-элемент карточки
  const cardElement = createCard(newCardData, deleteCard);

  // Добавляем карточку в начало списка
  placesList.prepend(cardElement);

  // Очищаем форму
  formElementCard.reset();

  // Закрываем попап
  closeModal(newCardPopup);
}

// Вешаем обработчик
formElementCard.addEventListener("submit", handleFormSubmitN);

export { openNewCardPopup };
