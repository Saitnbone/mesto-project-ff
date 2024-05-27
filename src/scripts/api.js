// Объект конфигурации для API-запросов
const config = {
  getMethod: "GET",
  postMethod: "POST",
  deleteMethod: "DELETE",
  patchMethod: "PATCH",
  putMethod: "PUT",
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
    "Content-Type": "application/json",
  },
  handleResponse: function (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  },
};

// API-запрос для получения собственной информации
export const fetchGetUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: config.getMethod,
    headers: config.headers,
  }).then(config.handleResponse);
};

// API-запрос для изменения данных о пользователе
export const fetchUpdateProfileInformation = (updatedInformation) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: config.patchMethod,
    headers: config.headers,
    body: JSON.stringify(updatedInformation),
  }).then(config.handleResponse);
};

// API-запрос для добавления новой карточки
export const fetchAddNewCard = (newCardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: config.postMethod,
    headers: config.headers,
    body: JSON.stringify(newCardData),
  }).then(config.handleResponse);
};

// API-запрос для получения информации о карточках
export const fetchGetCardsInformation = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: config.getMethod,
    headers: config.headers,
  }).then(config.handleResponse);
};

// API-запрос для удаления информации о карточках
export const fetchDeleteCardInformation = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: config.deleteMethod,
    headers: config.headers,
  }).then(config.handleResponse);
};

// API-запрос для добавления лайка карточки
export const fetchAddLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: config.putMethod,
    headers: config.headers,
  }).then(config.handleResponse);
};

// API-запрос для удаления лайка карточки
export const fetchRemoveLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: config.deleteMethod,
    headers: config.headers,
  }).then(config.handleResponse);
};

// API-запрос для обновления аватара пользователя
export const fetchUpdateUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: config.patchMethod,
    headers: config.headers,
    body: JSON.stringify(avatar),
  }).then(config.handleResponse);
};
