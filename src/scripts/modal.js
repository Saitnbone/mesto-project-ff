// @todo: Функция открытия модального окна
export const openPopup = (modal, closePopupEsc) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
};

// @todo: Функция закрытия модального окна
export const closePopup = (modal) => {
  if (modal.classList.contains("popup_is-opened")) {
    modal.classList.remove("popup_is-opened");
    modal.classList.add("popup_is-animated");
  }
};
