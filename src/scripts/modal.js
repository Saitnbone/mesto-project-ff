import content from "./cards";

// @todo: DOM узлы
const editProfilePopup = document.querySelector(".popup_type_edit");
const addPhotoPopup = document.querySelector(".popup_type_new-card");
const popupContents = document.querySelectorAll(".popup__content");
const editButton = content.querySelector(".profile__edit-button");
const addButton = content.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const popupsOverlay = document.querySelectorAll(".popup");

// @todo: Функция открытия модального окна
const openPopup = (modal) => {
  modal.classList.add("popup_is-opened");
};

// @todo: Функция закрытия модального окна
const closePopup = (modal) => {
  if (modal.classList.contains("popup_is-opened")) {
    modal.classList.remove("popup_is-opened");
    modal.classList.add("popup_is-animated");
  }
};

// @todo: Функция закрытия модального окна на кнопку "esc"
const closePopupEsc = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      openedPopup.classList.remove("popup_is-opened");
      openedPopup.classList.add("popup_is-animated");
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

//@todo: Слушатели событий
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

export { openPopup, closePopup };
