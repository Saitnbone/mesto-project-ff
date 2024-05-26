/*
--------------------------------------------------------
                Настройки для проекта
--------------------------------------------------------
*/
// @todo: Импорт стилей для проекта
import "./index.css";

// @todo: Импорт компонентов для проекта
import {
  fetchGetUserInformation,
  fetchGetCardsInformation,
  fetchAddNewCard,
  fetchUpdateProfileInformation,
  fetchUpdateUserAvatar,
} from "./scripts/api";
import { createCard, likeCard, deleteCard } from "./scripts/cards";
import { openPopup, closePopup } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validationForms";

// @todo: DOM узлы для форм
const cardForm = document.querySelector('[name="new-place"]');
const avatarForm = document.querySelector('[name="edit-avatar"]');
const profileForm = document.querySelector('[name="edit-profile"]');
const formButton = document.querySelector(".popup__button");

// @todo: DOM узлы для cards.js
const content = document.querySelector(".content");
const sectionPlaces = content.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");

// @todo: DOM узлы для cardForm
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// @todo: DOM узлы для modal
const editProfilePopup = document.querySelector(".popup_type_edit");
const addPhotoPopup = document.querySelector(".popup_type_new-card");
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const popupsOverlay = document.querySelectorAll(".popup");

// @todo: DOM узлы для блока с аватаром
const avatarBlock = document.querySelector(".profile__image-block");
const userAvatar = avatarBlock.querySelector(".profile__image");
const avatarFormInput = document.querySelector("#link-avatar");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");

// @todo: DOM узлы для profileForm
const profileSection = document.querySelector(".profile");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);
const profileTitleInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);

// @todo: Объект настроек для валидции форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_show",
};

// @todo: Добавление класса для анимация для popup
popupsOverlay.forEach((el) => {
  el.classList.add("popup_is-animated");
});

// @todo: Функция создания новой карточки
const handleAddFormCard = (evt) => {
  evt.preventDefault();
  const cardButton = cardForm.querySelector(".popup__button");
  renderLoading(true, cardButton);

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const cardInfo = {
    name: cardName,
    link: cardLink,
  };

  // Вызов API-запроса для добавления новой карточки
  fetchAddNewCard(cardInfo)
    .then((newCardData) => {
      if (newCardData) {
        const place = createCard(
          newCardData,
          likeCard,
          openImageCard,
          deleteCard
        );
        sectionPlaces.prepend(place);
        cardForm.reset();
        closePopup(addPhotoPopup);
      }
    })
    .catch((error) => {
      console.error("Error adding new card:", error);
    })
    .finally(() => {
      renderLoading(false, cardButton);
    });
};

/* @todo: Функция заполенения инпутов формы профиля пользователя
 при открытии формы
*/
const addInputsInformation = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
};

// @todo: Функция отправки формы пользователя
const submitProfileInformation = (evt) => {
  evt.preventDefault();
  const profileButton = profileForm.querySelector(".popup__button");
  const titleValue = profileTitleInput.value;
  const descriptionValue = profileDescriptionInput.value;
  profileTitle.textContent = titleValue;
  profileDescription.textContent = descriptionValue;
  renderLoading(true, profileButton);

  // Объект обновленной информации о пользователе
  const updatedUserInformation = {
    name: titleValue,
    about: descriptionValue,
  };

  // API-вызов для отправки обновленной информации о пользователе
  fetchUpdateProfileInformation(updatedUserInformation).finally(() => {
    renderLoading(false, profileButton);
  });
  closePopup(editProfilePopup);
};

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

// @ todo: Функция инициализации рендеринга карточек
const inicializationRendering = () => {
  Promise.all([fetchGetUserInformation(), fetchGetCardsInformation()])
    .then(([userData, cardData]) => {
      if (userData._id && Array.isArray(cardData)) {
        renderInitialCards(cardData, userData);
        renderingProfile(userData);
        renderingUserAvatar(userData);
      } else {
        console.error("Invalid format");
      }
    })
    .catch((error) => {
      console.error("Error cards data :", error);
    });
};

// @todo: Вызов функции инициализации рендеринга карточек
inicializationRendering();

// @todo: Функция рендеринга аватара пользователя
const renderingUserAvatar = (userData) => {
  userAvatar.src = userData.avatar;
};

// @todo: Функция рендеринга информации о пользователе
const renderingProfile = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
};

// @todo: Функция обновления аватара пользователя
const updateUserAvatar = (evt) => {
  evt.preventDefault();
  const avatarFormbutton = avatarForm.querySelector(".popup__button");
  renderLoading(true, avatarFormbutton);
  const updatedAvatarLink = avatarFormInput.value.trim();

  fetchUpdateUserAvatar(updatedAvatarLink)
    .then((userData) => {
      if (userData) {
        userAvatar.src = userData.avatar;
        avatarForm.reset();
        closePopup(avatarPopup);
      }
    })
    .catch((error) => {
      console.error("Error updating user avatar:", error);
    })
    .finally(() => {
      renderLoading(false, avatarFormbutton);
    });
};

// @todo: Функция изменения статуса кнопки при отправке результата
const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
};

// @todo: Функция вывода карточки на страницу
const renderInitialCards = (cardData, userData) => {
  cardData.forEach((element) => {
    const cardItem = createCard(
      element,
      likeCard,
      openImageCard,
      deleteCard,
      userData
    );
    sectionPlaces.append(cardItem);
  });
};

// @todo: Вызов функции проверки валидации форм
enableValidation(validationConfig);

// @todo: Слушатели событий для формы с аватаром пользователя
avatarBlock.addEventListener("click", () => {
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
});

avatarForm.addEventListener("submit", updateUserAvatar);

// @todo: Слушатели событий для cardForm
cardForm.addEventListener("submit", handleAddFormCard);

// @todo: Слушатели событий для modal.js
popupsOverlay.forEach((overlay) => {
  overlay.addEventListener("click", closePopupOverlay);
});

editButton.addEventListener("click", () => {
  addInputsInformation();
  clearValidation(profileForm, validationConfig);
});

addButton.addEventListener("click", () => {
  openPopup(addPhotoPopup);
  clearValidation(cardForm, validationConfig);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const modal = button.closest(".popup");
    closePopup(modal);
  });
});

// @todo: Слушатели событий для profileForm
profileForm.addEventListener("submit", submitProfileInformation);
