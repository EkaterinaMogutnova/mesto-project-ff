// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Функция создания карточки

// Получаем шаблон
const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, DeleteCard) {
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
  deleteButton.addEventListener("click", () => DeleteCard(cardElement));

  return cardElement;
}

// Функция удаления карточки
function DeleteCard(cardElement) {
  cardElement.remove();
}

// Добавляем карточки на страницу
document.addEventListener("DOMContentLoaded", () => {
  const placesList = document.querySelector(".places__list");

  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, DeleteCard);
    placesList.append(cardElement);
  });
});
