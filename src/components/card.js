import { handleEscape, openPopup } from "./modal.js";

// Функция создания карточки

// Получаем шаблон
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCard, likeCard, openImageCallback) {
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
  likeButton.addEventListener("click", function (evt) {
    if (typeof likeCard === "function") {
      likeCard(evt);
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

    openPopup(imagePopup);
  });
  cardImage.addEventListener("click", () => openImageCallback(cardData));
  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, deleteCard };
