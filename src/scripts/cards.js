// Импорты
import initialCards from "./cardsData";
import { openPopup } from "./modal";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM-узлы
const content = document.querySelector(".content");
const sectionPlaces = content.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");

// @todo: Функция создания карточки
const createCard = (cardData, likeCard, openImageCard, onDelete) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardInformation = cardElement.querySelector(".card__image");
  cardInformation.src = cardData.link;
  cardInformation.alt = cardData.name + " фотокарточка";
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => likeCard(evt));
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", (evt) => openImageCard(evt));
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => onDelete(cardElement));
  return cardElement;
};

const openImageCard = (evt) => {
  const place = evt.target.closest(".card");
  let cardImage = place.querySelector(".card__image");
  let cardTitle = place.querySelector(".card__title");
  caption.textContent = cardTitle.textContent;
  image.src = cardImage.src;
  image.alt = cardTitle.alt;
  openPopup(popupImage);
};

// @todo: Функция лайка карточки
const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card.remove();
};

// @todo: Функция вывода карточки на страницу
const renderInitialCards = () => {
  initialCards.forEach((element) => {
    const cardItem = createCard(element, likeCard, openImageCard, deleteCard);
    sectionPlaces.append(cardItem);
  });
};

renderInitialCards();

export default content;
export {
  createCard,
  renderInitialCards,
  likeCard,
  openImageCard,
  deleteCard,
  sectionPlaces,
};
