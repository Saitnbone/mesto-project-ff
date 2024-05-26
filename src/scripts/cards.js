import {
  fetchDeleteCardInformation,
  fetchGetUserInformation,
  fetchAddLike,
  fetchRemoveLike,
} from "./api";

// @todo: Функция добавления лайка карточки
export const likeCard = (evt, cardElement, cardId, cardData, userData) => {
  const like = evt.target;
  const likeCounts = cardElement.querySelector(".card__like-button-counter");
  const checkLikeStatus = cardData.likes.some(
    (user) => user._id === userData._id
  );

  // API-вызов взависимости от условия проверки статуса лайка
  const switchLikeStatus = checkLikeStatus ? fetchRemoveLike : fetchAddLike;

  switchLikeStatus(cardId)
    .then((updateStatusLike) => {
      cardData.likes = updateStatusLike.likes;
      like.classList.toggle("card__like-button_is-active");
      likeCounts.textContent = updateStatusLike.likes.length;
    })
    .catch((error) => {
      console.error("Error processing likes : ", error);
    });
};

// @todo: Функция удаления лайка карточки
export const deleteCard = (card) => {
  card.remove();
};

// @todo: Функция проверки роли пользователя
const checkUserRole = (otherUsers, closeButton) => {
  const otherOwners = otherUsers.owner._id;

  // API-вызов для проверки роли пользователя
  fetchGetUserInformation()
    .then((mainUserInformation) => {
      if (mainUserInformation && mainUserInformation._id === otherOwners) {
        closeButton.classList.add("card__delete-button_show");
      } else {
        closeButton.classList.remove("card__delete-button_show");
      }
    })
    .catch((error) => {
      console.error("Error getting primary user information : ", error);
    });
};

// @todo: Функция проверки состояния кнопки лайка
const checkLikeButtonState = (cardData, likeButton, userData) => {
  const likeButtonState = cardData.likes.some(
    (user) => user._id === userData._id
  );
  if (likeButtonState) {
    likeButton.classList.add("card__like-button_is-active");
  }
};

// @todo: Функция создания карточки
export const createCard = (
  cardData,
  likeCard,
  openImageCard,
  onDelete,
  userData
) => {
  // Константы для карточек
  const cardLink = cardData.link;
  const cardName = cardData.name;
  const likeCounter = cardData.likes.length;
  const cardId = cardData._id;
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardInformation = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Создание карточки
  cardInformation.src = cardLink;
  cardInformation.alt = cardName + " фотокарточка";
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement.querySelector(".card__like-button-counter").textContent =
    likeCounter;

  // @todo: Вызов функции проверки состояния кнопки лайка
  checkLikeButtonState(cardData, likeButton, userData);

  // @todo: Вызов функции проверки роли пользователя
  checkUserRole(cardData, deleteButton);

  // Слушатели событий
  cardInformation.addEventListener("click", (evt) => openImageCard(evt));

  likeButton.addEventListener("click", (evt) => {
    likeCard(evt, cardElement, cardId, cardData, userData);
  });

  deleteButton.addEventListener("click", () => {
    // API-вызов для удаления карточки с сервера
    fetchDeleteCardInformation(cardId)
      .then((res) => {
        if (res) {
          onDelete(cardElement);
        }
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  });
  return cardElement;
};
