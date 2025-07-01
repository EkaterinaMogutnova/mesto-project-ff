export {
  getUserInfo,
  getInitialCards,
  updateProfile,
  addNewCard,
  updateAvatar,
  deleteCard,
  likeCard,
  unlikeCard,
};

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "e677cc6f-0472-4baf-8fb8-62ce8eb99c1e",
    "Content-Type": "application/json",
  },
};

//Проверка сервера
function checkResponse(res) {
  //Без ошибок
  if (res.ok) {
    return res.json();
  }
  // Ошибка
  return Promise.reject(`'ошибка': ${res.status}`);
}

//Получаем инфо о пользователе
function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при загрузке данных пользователя:", err);
      throw err;
    });
}

//Получаем карточки с сервера
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при загрузке карточек:", err);
      throw err;
    });
}

//Профиль
function updateProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
      throw err;
    });
}

//Добавляем новую карточку
function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при создании карточки:", err);
      throw err;
    });
}

//Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
      throw err;
    });
}

//Лайк +
function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при добавлении лайка:", err);
      throw err;
    });
}

//Лайк -
function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при удалении лайка:", err);
      throw err;
    });
}

//Аватар
function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка:", err);
      throw err;
    });
}
