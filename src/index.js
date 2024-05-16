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
import { initializationOfCheck } from "./scripts/validationForms";

// @todo: DOM узлы для cards.js
const content = document.querySelector(".content");
const sectionPlaces = content.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");

// @todo: DOM узлы для cardForm
const cardForm = document.querySelector('[name="new-place"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// @todo: DOM узлы для modal
const editProfilePopup = document.querySelector(".popup_type_edit");
const addPhotoPopup = document.querySelector(".popup_type_new-card");
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const popupsOverlay = document.querySelectorAll(".popup");
// Все инпуты всех форм на проекте
// const popupInputs = document.querySelectorAll('.popup__input')
// const formError = formElement.querySelector(`.${formInput.id}-error`);

// @todo: DOM узлы для profileForm
const profileSection = document.querySelector(".profile");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);
const profileForm = document.querySelector('[name="edit-profile"]');
const profileTitleInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);
// const profileFormSubmitButton = profileForm.querySelector(".popup__button");

// @todo: Добавление класса для анимация для popup
popupsOverlay.forEach((el) => {
  el.classList.add("popup_is-animated");
});

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
  closePopup(addPhotoPopup);
};

// @todo: Функция заполенения инпутов формы профиля пользователя
const addInputsInformation = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
};

// @todo: Функция отправки формы пользователя
const submitProfileInformation = (evt) => {
  evt.preventDefault();
  const titleValue = profileTitleInput.value;
  const descriptionValue = profileDescriptionInput.value;
  profileTitle.textContent = titleValue;
  profileDescription.textContent = descriptionValue;
  closePopup(editProfilePopup);
  initializationOfCheck();
};

// @todo: Функция вывода ошибки валидации
const showInputError = (input, errorMessage) => {
  // input.classList.add(".popup__input_error");
  // errorMessage = formError.textContent;
};

// @todo: Функция отключения ошибки валидации
const hideInputError = (input, errorMessage) => {};

// // @todo: Функция проверки валидности инпутов в форме пользователя
// const checkProfileValidity = () => {
//   const titleValidity = profileTitleInput.validity.valid;
//   const descriptionValidity = profileDescriptionInput.validity.valid;
//   setEventListeners();
//   if (titleValidity && descriptionValidity) {
//     profileFormSubmitButton.disable = false;
//     if (profileFormSubmitButton.classList.contains("popup__button_disable")) {
//       profileFormSubmitButton.classList.remove("popup__button_disable");
//     }
//     hideInputError();
//   }
//   showInputError();
//   profileFormSubmitButton.disable = true;
//   profileFormSubmitButton.classList.add("popup__button_disable");
// };

// @todo: Функция показа изображения карточки
const openImageCard = (evt) => {
  const place = evt.target.closest(".card");
  const cardImage = place.querySelector(".card__image");
  const cardTitle = place.querySelector(".card__title");
  caption.textContent = cardTitle.textContent;
  image.src = cardImage.src;
  image.alt = cardTitle.alt;
  openPopup(popupImage);
};

// @todo: Функция закрытия модального окна через нажатие на оверлей страницы
const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
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

// @todo: Слушатель событий для инпутов формы
const setEventListeners = () => {
  const inputList = Array.from(document.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    input.addEventListener("input", checkProfileValidity);
  });
};

// @todo: Слушатели событий для cardForm
cardForm.addEventListener("submit", handleAddFormCard);

// @todo: Слушатели событий для modal.js
popupsOverlay.forEach((overlay) => {
  overlay.addEventListener("click", closePopupOverlay);
});

editButton.addEventListener("click", addInputsInformation);

addButton.addEventListener("click", () => {
  openPopup(addPhotoPopup);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const modal = button.closest(".popup");
    closePopup(modal);
  });
});

// @todo: Слушатели событий для profileForm
profileForm.addEventListener("submit", submitProfileInformation);
