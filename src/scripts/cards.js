import { fetchDeleteCardInformation } from "./api";

// @todo: Функция добавления лайка карточки
export const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

// @todo: Функция удаления лайка карточки
export const deleteCard = (card) => {
  card.remove();
};

// @todo: Функция создания карточки
export const createCard = (cardData, likeCard, openImageCard, onDelete) => {
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

  // Создание карточек
  cardInformation.src = cardLink;
  cardInformation.alt = cardName + " фотокарточка";

  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement.querySelector(".card__like-button-counter").textContent =
    likeCounter;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      likeCard(evt);
    });

  cardInformation.addEventListener("click", (evt) => openImageCard(evt));
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    // API-запрос на удаление карточки
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
