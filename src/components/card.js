// Функция создания карточки
import { openPopup } from "./modal.js";
// Получаем шаблон
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const handleLike = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};
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

  cardImage.addEventListener("click", () => handleImageClick(cardData));
  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
function handleImageClick(cardData) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = `Фотография места: ${cardData.name}`;
  popupCaption.textContent = cardData.name;

  openPopup(imagePopup);
}

export { createCard, deleteCard, handleLike, handleImageClick };
