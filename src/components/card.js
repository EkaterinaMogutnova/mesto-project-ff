import { handleEscape } from "./modal.js";

// Функция создания карточки

// Получаем шаблон
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCard, likeCard) {
  // клонируем
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Находим элементы
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // Заполняем
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  // Обработчик удаления карточки
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  //лайк
  likeButton.addEventListener("click", function () {
    this.classList.toggle("card__like-button_is-active");
    if (typeof likeCard === "function") {
      likeCard(cardData);
    }
  });

  //Открываем картинку
  cardImage.addEventListener("click", function () {
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    // Заполняем попап данными
    popupImage.src = this.src;
    popupImage.alt = this.alt;
    popupCaption.textContent = cardData.name;
    // Открываем картинку
    imagePopup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscape);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, deleteCard };