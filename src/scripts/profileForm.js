import { closePopup } from "./modal";

// @todo: DOM узлы
const profileSection = document.querySelector(".profile");
const profileForm = document.querySelector('[name="edit-profile"]');
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

// @todo: Функция отправки формы
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileSection.querySelector(".profile__title").textContent = nameInput.value;
  profileSection.querySelector(".profile__description").textContent =
    jobInput.value;
  profileForm.reset();
  closePopup(profileForm.closest(".popup"));
};

//@todo: Слушатели событий
formElement.addEventListener("submit", handleFormSubmit);

export { formElement, profileSection };
