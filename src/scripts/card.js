import {
  fetchDeleteCardInformation,
  fetchAddLike,
  fetchRemoveLike,
} from "./api";

// Функция добавления лайка карточки
const likeCard = (evt, cardElement, cardId, cardData, userData) => {
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

// Функция удаления карточки
const deleteCard = (card, cardId) => {
  // API-вызов для удаления карточки
  fetchDeleteCardInformation(cardId)
    .then((res) => {
      if (res) {
        card.remove();
      }
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    });
};

// Функция проверки состояния кнопки удаления
const checkDeleteButtonState = (
  owner,
  cardData,
  cardId,
  cardElement,
  deleteButton
) => {
  if (owner === cardData.owner._id) {
    deleteButton.classList.add("card__delete-button_show");
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement, cardId);
    });
  } else {
    deleteButton.classList.remove("card__delete-button_show");
  }
};

// Функция проверки состояния кнопки лайка
const checkLikeButtonState = (cardData, likeButton, userData) => {
  const likeButtonState = cardData.likes.some(
    (user) => user._id === userData._id
  );
  if (likeButtonState) {
    likeButton.classList.add("card__like-button_is-active");
  }
};

// Функция создания карточки
export const createCard = (cardData, openImageCard, userData) => {
  // Константы для карточек
  const cardLink = cardData.link;
  const cardName = cardData.name;
  const likeCounter = cardData.likes.length;
  const cardId = cardData._id;
  const owner = userData._id;
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

  // Вызовы функций проверки
  checkDeleteButtonState(owner, cardData, cardId, cardElement, deleteButton);
  checkLikeButtonState(cardData, likeButton, userData);

  // Слушатели событий
  cardInformation.addEventListener("click", (evt) => openImageCard(evt));
  likeButton.addEventListener("click", (evt) => {
    likeCard(evt, cardElement, cardId, cardData, userData);
  });

  return cardElement;
};
