// @todo: Функция вывода ошибки валидации
const showInputError = (form, input, errorMessage) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add("popup__input_error_active");
  error.textContent = errorMessage;
  error.classList.add("popup__input-error_show");
};

// @todo: Функция отключения ошибки валидации
const hideInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__input_error_active");
  error.classList.remove("popup__input-error_show");
  error.textContent = "";
};

// @todo: Функция проверки валидности инпутов в форме пользователя
const checkProfileValidity = (form, input) => {
  const submitButton = form.querySelector(".popup__button");
  if (input) {
    submitButton.disable = false;
    hideInputError(form, input);
  }
  showInputError(form, input, input.validationMessage);
};

// @todo: Функция добавления слушателей инпутов форм
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    input.addEventListener("input", checkProfileValidity(form, input));
  });
};

// @todo: Функция сбора
export const initializationOfCheck = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  });
  setEventListeners(form);
};
