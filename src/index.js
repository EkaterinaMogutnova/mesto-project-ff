import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard } from "./components/card.js";
import {
  openPopup,
  closeModal,
  handleEscape,
  handleOverlayClick,
} from "./components/modal.js";

const modals = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = profileForm.querySelector('[name="name"]');
const jobInput = profileForm.querySelector('[name="description"]');
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
  // Инициализация карточек
  initialCards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      handleLike,
      handleImageClick // Добавляем обработчик клика по изображению
    );
    placesList.append(cardElement);
  });

  // Добавляем анимацию для попапов
  document.querySelectorAll(".popup").forEach((popup) => {
    if (!popup.classList.contains("popup_is-animated")) {
      popup.classList.add("popup_is-animated");
    }
    // Добавляем обработчик клика по оверлею
    popup.addEventListener("click", handleOverlayClick);
  });
});
// Обработчик отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Отменяем стандартную отправку формы

  // Получаем значения из полей ввода
  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Функция открытия попапа с картинкой
function openNewCardPopup() {
  openPopup(newCardPopup);
}

// Навешиваем обработчики
openCardButton.addEventListener("click", openNewCardPopup);

editButton.addEventListener("click", () => {
  openPopup(popupEdit);
});

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
  const cardElement = createCard(newCardData, deleteCard, handleLike);

  // Добавляем карточку в начало списка
  placesList.prepend(cardElement);

  // Очищаем форму
  formElementCard.reset();

  // Закрываем попап
  closeModal(newCardPopup);
}

// Вешаем обработчик
formElementCard.addEventListener("submit", handleFormSubmitN);

const handleLike = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};
function handleImageClick(cardData) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = `Фотография места: ${cardData.name}`;
  popupCaption.textContent = cardData.name;

  openPopup(imagePopup);
}
export { openNewCardPopup };
