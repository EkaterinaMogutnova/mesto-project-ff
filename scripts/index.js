// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Функция создания карточки

// Получаем шаблон
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCard) {
  //  клонируем
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  // Находим элементы
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Заполняем
  cardImage.src = cardData.link;
  cardImage.alt = `Фотография места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  // Обработчик удаления карточки
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Добавляем карточки на страницу
document.addEventListener("DOMContentLoaded", () => {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.append(cardElement);
  });
});
