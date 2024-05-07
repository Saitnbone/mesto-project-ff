// @todo: Функция лайка карточки
export const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

// @todo: Функция удаления карточки
export const deleteCard = (card) => {
  card.remove();
};

// @todo: Функция создания карточки
export const createCard = (cardData, likeCard, openImageCard, onDelete) => {
  const cardTemplate = document.querySelector("#card-template").content;
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

  cardInformation.addEventListener("click", (evt) => openImageCard(evt));
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => onDelete(cardElement));
  return cardElement;
};
