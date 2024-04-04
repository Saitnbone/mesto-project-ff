// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const sectionPlaces = content.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardInformation = cardElement.querySelector(".card__image");
  cardInformation.src = cardData.link;
  cardInformation.alt = cardData.name + " фотокарточка";

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
function renderInitialCards() {
  initialCards.forEach((element) => {
    const cardItem = createCard(element);
    sectionPlaces.append(cardItem);
  });
}

renderInitialCards();
