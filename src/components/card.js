// Функция создания карточки
import { handleImageClick } from "../index.js";
import { deleteCard as deleteCardApi, likeCard, unlikeCard } from "./api.js";

// Получаем шаблон
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// Добавляем лайки
const handleLike = (evt, cardId, likeCounter) => {
  const likeButton = evt.target;
  if (likeButton.classList.contains("card__like-button_is-active")) {
    unlikeCard(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.error("Ошибка:", err));
  } else {
    likeCard(cardId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.error("Ошибка:", err));
  }
  evt.target.classList.toggle("card__like-button_is-active");
};

function createCard(cardData, deleteCard, likeCard, openImageCallback, userId) {
  if (!cardData) {
    console.error("Данные карточки не переданы");
    return null;
  }
  if (!cardData.likes) {
    cardData.likes = [];
  }

  // Клонируем
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Находим элементы
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".place__like-counter");

  // Устанавливаем начальное количество лайков
  likeCounter.textContent = cardData.likes.length;
  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Заполняем
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  // Обработчик удаления карточки
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () =>
      deleteCard(cardElement, cardData._id)
    );
  } else {
    deleteButton.remove();
  }

  //Лайк
  likeButton.addEventListener("click", function (evt) {
    if (typeof likeCard === "function") {
      likeCard(evt, cardData._id, likeCounter);
    }
  });

  //Открываем картинку
  cardImage.addEventListener("click", () => handleImageClick(cardData));
  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.error("Ошибка:", err));
}

export { createCard, deleteCard, handleLike };
