/*
--------------------------------------------------------
                Настройки для проекта
--------------------------------------------------------
*/
// @todo: Импорт стилей для проекта
import "./index.css";

// @todo: Импорт компонентов для проекта
import { initialCards } from "./scripts/cardsData";
import { createCard, likeCard, deleteCard } from "./scripts/cards";
import { openPopup, closePopup } from "./scripts/modal";

// @todo: DOM узлы для cards.js
// export const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const sectionPlaces = content.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");

// @todo: DOM узлы для cardForm.js
const cardForm = document.querySelector('[name="new-place"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// @todo: DOM узлы для modal.js
const editProfilePopup = document.querySelector(".popup_type_edit");
const addPhotoPopup = document.querySelector(".popup_type_new-card");
const popupContents = document.querySelectorAll(".popup__content");
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const popupsOverlay = document.querySelectorAll(".popup");

// @todo: DOM узлы для profileForm
const profileSection = document.querySelector(".profile");
const profileForm = document.querySelector('[name="edit-profile"]');
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

// @todo: Функция создания новой карточки
const handleAddFormCard = (evt) => {
  evt.preventDefault();
  const cardInfo = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const place = createCard(cardInfo, likeCard, openImageCard, deleteCard);
  sectionPlaces.prepend(place);
  cardForm.reset();
  closePopup(cardForm.closest(".popup"));
};

// @todo: Функция отправки формы пользователя
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileSection.querySelector(".profile__title").textContent = nameInput.value;
  nameInput.placeholder = nameInput.value;
  profileSection.querySelector(".profile__description").textContent =
    jobInput.value;
  jobInput.placeholder = jobInput.value;
  profileForm.reset();
  closePopup(profileForm.closest(".popup"));
};

// @todo: Функция показа изображения карточки
const openImageCard = (evt) => {
  const place = evt.target.closest(".card");
  let cardImage = place.querySelector(".card__image");
  let cardTitle = place.querySelector(".card__title");
  caption.textContent = cardTitle.textContent;
  image.src = cardImage.src;
  image.alt = cardTitle.alt;
  openPopup(popupImage, closePopupEsc);
};

// @todo: Функция закрытия модального окна на кнопку "esc"
const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_is-opened");
      openedPopup.classList.add("popup_is-animated");
      document.removeEventListener("keydown", closePopupEsc);
    }
  }
};

// @todo: Функция закрытия модального окна через нажатие на оверлей страницы
const closePopupOverlay = (evt) => {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (
    openedPopup &&
    ![...popupContents].some((el) => el.contains(evt.target)) &&
    ![...closeButtons].some((el) => el.contains(evt.target))
  ) {
    openedPopup.classList.remove("popup_is-opened");
    openedPopup.classList.add("popup_is-animated");
  }
};

// @todo: Функция вывода карточки на страницу
const renderInitialCards = () => {
  initialCards.forEach((element) => {
    const cardItem = createCard(element, likeCard, openImageCard, deleteCard);
    sectionPlaces.append(cardItem);
  });
};

renderInitialCards();

// @todo: Слушатели событий для cardForm.js
cardForm.addEventListener("submit", handleAddFormCard);

// @todo: Слушатели событий для modal.js
popupsOverlay.forEach((overlay) => {
  overlay.addEventListener("click", closePopupOverlay);
});

editButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
});

addButton.addEventListener("click", () => {
  openPopup(addPhotoPopup);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const modal = button.closest(".popup");
    closePopup(modal);
  });
});
// Обработчик события нажатия кнопки "esc"
document.addEventListener("keydown", closePopupEsc);

// @todo: Слушатели событий для profileForm.js
formElement.addEventListener("submit", handleFormSubmit);
