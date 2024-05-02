import content from "./cards";

// @todo: DOM узлы
const places = content.querySelector(".places");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addPhotoPopup = document.querySelector(".popup_type_new-card");
const viewImagePopup = document.querySelector(".popup_type_image");
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const viewImageButton = places.querySelector(".card__image");

const closeButtons = document.querySelectorAll(".popup__close");

// @todo: Функция открытия модального окна

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
}

// @todo: Функция закрытия модального окна
function closePopup(popup) {
  if (popup.classList.contains("popup_is-opened")) {
    popup.classList.remove("popup_is-opened");
    popup.classList.add("popup_is-animated");
  }
}

// Слушатели событий
editButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
});
addButton.addEventListener("click", function () {
  openPopup(addPhotoPopup);
});

viewImageButton.addEventListener("click", function () {
  openPopup(viewImagePopup);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    closePopup(popup);
  });
});
