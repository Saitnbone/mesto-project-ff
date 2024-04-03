// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const sectionPlaces = content.querySelector(".places__list");

// @todo: Функция создания карточки
function creatingCard(link, name) {
  const templateElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  templateElement.querySelector(".card__image").src = link;
  templateElement.querySelector(".card__image").alt = name + " фотокарточка";
  templateElement.querySelector(".card__title").textContent = name;

  return templateElement;
}

// @todo: Функция удаления карточки
function deletingCard(event) {
  event.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу
function showCard() {
  initialCards.forEach((element) => {
    const cardItem = creatingCard(element.link, element.name);
    cardItem
      .querySelector(".card__delete-button")
      .addEventListener("click", deletingCard);
    sectionPlaces.append(cardItem);
  });
}

showCard();
