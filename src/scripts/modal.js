// @todo: Функция закрытия модального окна на кнопку "esc"
export const closePopupEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      openedPopup.classList.toggle("popup_is-opened");
    }
  }
};

// @todo: Функция открытия модального окна
export const openPopup = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
};

// @todo: Функция закрытия модального окна
export const closePopup = (modal) => {
  if (modal.classList.contains("popup_is-opened")) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupEsc);
  }
};
