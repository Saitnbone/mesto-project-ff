// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const content = document.querySelector(".content");
const sectionPlaces = content.querySelector(".places");

// @todo: Функция создания карточки
function creatingCard(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;

  return cardElement;
}

// @todo: Функция удаления карточки
function deletingCard(event) {
  event.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу
function showCard() {
  initialCards.forEach((element) => {
    const el = creatingCard(element.name, element.link);
    el.querySelector(".card__delete-button").addEventListener(
      "click",
      deletingCard
    );
    sectionPlaces.append(el);
  });
}

showCard();
