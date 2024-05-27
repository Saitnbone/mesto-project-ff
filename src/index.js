/*
--------------------------------------------------------
                Настройки для проекта
--------------------------------------------------------
*/
// Импорт стилей для проекта
import "./index.css";

// Импорт компонентов для проекта
import {
  fetchGetUserInformation,
  fetchGetCardsInformation,
  fetchAddNewCard,
  fetchUpdateProfileInformation,
  fetchUpdateUserAvatar,
} from "./scripts/api";
import { createCard } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validationForms";

// DOM узлы для форм
const cardForm = document.querySelector('[name="new-place"]');
const avatarForm = document.querySelector('[name="edit-avatar"]');
const profileForm = document.querySelector('[name="edit-profile"]');

// DOM узлы для card.js
const content = document.querySelector(".content");
const sectionPlaces = content.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = document.querySelector(".popup__caption");

// DOM узлы для cardForm
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");

// DOM узлы для modal
const editProfilePopup = document.querySelector(".popup_type_edit");
const addPhotoPopup = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const popupsOverlay = document.querySelectorAll(".popup");

// DOM узлы для блока с аватаром
const avatarBlock = document.querySelector(".profile__image-block");
const userAvatar = avatarBlock.querySelector(".profile__image");
const avatarFormInput = document.querySelector("#link-avatar");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");

// DOM узлы для profileForm
const profileSection = document.querySelector(".profile");
const profileTitle = profileSection.querySelector(".profile__title");
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);
const profileTitleInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description"
);

// Объект настроек для валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_show",
};

// Добавление класса анимация для popup
popupsOverlay.forEach((el) => {
  el.classList.add("popup_is-animated");
});

// Функция создания новой карточки
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

  // Получение данных о пользователе и добавление их в новую карточку
  Promise.all([fetchGetUserInformation(), fetchAddNewCard(cardInfo)])
    .then(([userData, newCardData]) => {
      if (userData._id && newCardData) {
        const place = createCard(
          newCardData,
          openImageCard,
          userData
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

// Функция заполенения инпутов формы профиля пользователя при открытии формы
const addInputsProfileForm = () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
};

// Функция отправки формы пользователя
const submitProfileInformation = (evt) => {
  evt.preventDefault();
  const profileButton = profileForm.querySelector(".popup__button");
  const titleValue = profileTitleInput.value;
  const descriptionValue = profileDescriptionInput.value;

  renderLoading(true, profileButton);

  const updatedUserInformation = {
    name: titleValue,
    about: descriptionValue,
  };

  fetchUpdateProfileInformation(updatedUserInformation)
    .then((updatedUserData) => {
      if (updatedUserData) {
        profileTitle.textContent = updatedUserData.name;
        profileDescription.textContent = updatedUserData.about;
        closePopup(editProfilePopup);
      }
    })
    .catch((error) => {
      console.error("Error updating profile information:", error);
    })
    .finally(() => {
      renderLoading(false, profileButton);
    });
};

// Функция показа изображения карточки
const openImageCard = (evt) => {
  const place = evt.target.closest(".card");
  const cardImage = place.querySelector(".card__image");
  const cardTitle = place.querySelector(".card__title");
  caption.textContent = cardTitle.textContent;
  image.src = cardImage.src;
  image.alt = cardTitle.alt;
  openPopup(popupImage);
};

// Функция закрытия модального окна через нажатие на оверлей страницы
const closePopupOverlay = (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
};

// Функция обновления аватара пользователя
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

// Функция инициализации рендеринга карточек
const inicializationRendering = () => {
  Promise.all([fetchGetUserInformation(), fetchGetCardsInformation()])
    .then(([userData, cardData]) => {
      if (userData._id && Array.isArray(cardData)) {
        renderInitialCards(userData, cardData);
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

// Вызов функции инициализации рендеринга карточек
inicializationRendering();

// Функция рендеринга аватара пользователя
const renderingUserAvatar = (userData) => {
  userAvatar.src = userData.avatar;
};

// Функция рендеринга информации о пользователе
const renderingProfile = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
};

// Функция изменения статуса кнопки в формах при отправке результата
const renderLoading = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

// Функция вывода карточки на страницу
const renderInitialCards = (userData, cardData) => {
  if (userData && userData._id) {
    cardData.forEach((element) => {
      const cardItem = createCard(element, openImageCard, userData);
      sectionPlaces.append(cardItem);
    });
  } else {
    console.error("Invalid user data:", userData);
  }
};

// Вызов функции проверки валидации форм
enableValidation(validationConfig);

// Слушатели событий для формы с аватаром пользователя
avatarBlock.addEventListener("click", () => {
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
});

avatarForm.addEventListener("submit", updateUserAvatar);

// Слушатели событий для cardForm
cardForm.addEventListener("submit", handleAddFormCard);

// Слушатели событий для modal.js
popupsOverlay.forEach((overlay) => {
  overlay.addEventListener("click", closePopupOverlay);
});

editButton.addEventListener("click", () => {
  clearValidation(profileForm, validationConfig);
  addInputsProfileForm();
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

// Слушатели событий для profileForm
profileForm.addEventListener("submit", submitProfileInformation);
