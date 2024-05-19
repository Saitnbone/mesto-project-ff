const showInputError = (form, input, errorValue) => {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.add("popup__input-error_show");
  error.textContent = errorValue;
};

const hideInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.remove("popup__input-error_show");
  error.textContent = "";
  input.setCustomValidity("");
};

// @todo: Функция проверки валидности инпутов в формах
const checkProfileValidity = (form, input) => {
  if (input.validity.patternMismatch) {
    showInputError(
      form,
      input,
      input.setCustomValidity(input.dataset.errorMessage)
    );
  } else {
    hideInputError(form, input);
  }
  if (input.validity.valid) {
    hideInputError(form, input);
  } else {
    showInputError(form, input, input.validationMessage);
  }
};

// @todo: Функция добавления слушателей инпутов форм
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(".popup__input"));
  inputList.forEach((input) => {
    input.addEventListener("input", () => checkProfileValidity(form, input));
  });
};

// @todo: Функция инициализации проверки инпутов форм
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

// @todo: Функция очистки валидации форм
// const clearValidation = () => {};
