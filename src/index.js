import "../src/pages/index.css";
import { createCard, deleteCard, handleLike } from "./components/card.js";
import {
  openPopup,
  closeModal,
  handleEscape,
  handleOverlayClick,
} from "./components/modal.js";
import {
  enableValidation,
  toggleButtonState,
  clearValidation,
} from "./components/validation.js";
import {
  getUserInfo,
  checkResponse,
  getInitialCards,
  updateProfile,
  addNewCard,
  updateAvatar,
} from "./components/api.js";
import { data } from "autoprefixer";

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

const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar = document.querySelector('form[name="edit-avatar"]');
const avatarInput = formEditAvatar.querySelector(".popup__input_type_avatar");
const btnOpenAvatarPopup = document.querySelector(".profile__avatar-button");

let userId; // Объявляем переменную для хранения ID пользователя

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cardsData, userData]) => {
    userId = userData._id; // Сохраняем ID пользователя

    // Обновляем информацию о пользователе
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;

    // Очищаем контейнер перед добавлением карточек
    placesList.innerHTML = "";
    document.querySelector(
      ".profile__image"
    ).style.backgroundImage = `url(${userData.avatar})`;

    // Добавляем карточки (новые сверху)
    cardsData.reverse().forEach((card) => {
      const cardElement = createCard(
        card,
        deleteCard,
        handleLike,
        handleImageClick,
        userId
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error(`Ошибка загрузки: ${err}`);
  });

// Добавим обработчик открытия попапа
btnOpenAvatarPopup.addEventListener("click", () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});

// Добавим обработчик отправки формы
formEditAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const originalText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  updateAvatar(avatarInput.value)
    .then((userData) => {
      document.querySelector(
        ".profile__image"
      ).style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupEditAvatar);
    })
    .catch((err) => console.error("Ошибка:", err))
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validationConfig);

// Добавляем карточки на страницу
document.addEventListener("DOMContentLoaded", () => {
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
  evt.preventDefault();

  // Получаем значения из полей ввода
  const newName = nameInput.value;
  const newJob = jobInput.value;
  updateProfile(newName, newJob)
    .then((data) => {
      profileName.textContent = newName;
      profileJob.textContent = newJob;
    })
    .catch((err) => console.error("Ошибка:", err))
    .finally(() => {
      closeModal(popupEdit);
    });
}

// Прикрепляем обработчик к форме
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Функция открытия попапа с картинкой
function openNewCardPopup() {
  openPopup(newCardPopup);
}

// Навешиваем обработчики
openCardButton.addEventListener("click", () => {
  formElementCard.reset();
  clearValidation(formElementCard, validationConfig);
  openPopup(newCardPopup);
});

editButton.addEventListener("click", () => {
  clearValidation(profileForm, validationConfig);
  // Заполняем из профиля
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

// Обработчик отправки формы
function handleFormSubmitN(evt) {
  evt.preventDefault();

  // Получаем значения из формы
  const cardName = nameInputPlace.value;
  const cardLink = linkInputPlace.value;

  addNewCard(cardName, cardLink)
    .then((data) => {
      // Создаем объект с данными новой карточки
      const newCardData = {
        name: data.name,
        link: data.link,
      };

      // Создаем DOM-элемент карточки
      const cardElement = createCard(
        newCardData,
        deleteCard,
        handleLike,
        handleImageClick
      );

      // Добавляем карточку в начало списка
      placesList.prepend(cardElement);
    })
    .catch((err) => console.error("Ошибка:", err))
    .finally(() => {
      // Очищаем форму
      formElementCard.reset();

      // Закрываем попап
      closeModal(newCardPopup);
    });
}

// Вешаем обработчик
formElementCard.addEventListener("submit", handleFormSubmitN);

function handleImageClick(cardData) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = `Фотография места: ${cardData.name}`;
  popupCaption.textContent = cardData.name;

  openPopup(imagePopup);
}

btnOpenAvatarPopup.addEventListener("click", () => {
  openPopup(popupEditAvatar);
});
export { handleImageClick };
