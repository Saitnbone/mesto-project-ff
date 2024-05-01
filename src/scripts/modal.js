import content from "./cards";

// @todo: DOM узлы
const page = document.querySelector(".page__content");
const profilePopup = page.querySelector(".popup_type_edit");
const editButton = content.querySelector(".profile__edit-button");
// const closeButton =
export { page, profilePopup, editButton };

// @todo: Функция открытия формы редактирования профиля
export function openPopup() {
  profilePopup.style.display = "block";
}

// @todo: Функция открытия формы редактирования профиля
// function closePopup() {}

editButton.addEventListener("click", openPopup);
