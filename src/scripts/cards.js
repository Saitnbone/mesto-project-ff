import { fetchDeleteCardInformation, fetchGetUserInformation } from "./api";

// @todo: Функция добавления лайка карточки
export const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
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
      if (mainUserInformation && mainUserInformation._id !== otherOwners) {
        closeButton.classList.add("card__delete-button_hide");
      } else {
        closeButton.classList.remove("card__delete-button_hide");
      }
    })
    .catch((error) => {
      console.error("Error getting primary user information : ", error);
    });
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
  const deleteButton = cardElement.querySelector(".card__delete-button");

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

  // Слушатель нажатия на кнопку открытия изображения
  cardInformation.addEventListener("click", (evt) => openImageCard(evt));

  // @todo: Вызов функции проверки роли пользователя
  checkUserRole(cardData, deleteButton);

  // Слушатель нажатия на кнопку удаления
  deleteButton.addEventListener("click", () => {
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
