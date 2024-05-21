// @todo: Функция вывода ошибок валидации форм
const showInputError = (input, errorValue, settingsObject) => {
  const error = document.querySelector(`.${input.id}-error`);
  error.classList.add(settingsObject.errorClass);
  input.classList.add(settingsObject.inputErrorClass);
  error.textContent = errorValue;
};

// @todo: Функция скрытия ошибок валидации форм
const hideInputError = (input, settingsObject) => {
  const error = document.querySelector(`.${input.id}-error`);
  error.classList.remove(settingsObject.errorClass);
  input.classList.remove(settingsObject.inputErrorClass);
  error.textContent = "";
  input.setCustomValidity("");
};

// @todo: Функция проверки валидности инпутов в формах
const checkValidity = (input, settingsObject) => {
  if (input.validity.valueMissing) {
    input.setCustomValidity("Вы пропустили это поле.");
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity(input.dataset.typeErrorMessage);
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (input.validity.valid) {
    hideInputError(input, settingsObject);
  } else {
    showInputError(input, input.validationMessage, settingsObject);
  }
};

// @todo: Функция добавления слушателей инпутов форм
const setEventListeners = (form, settingsObject) => {
  const inputList = Array.from(
    form.querySelectorAll(settingsObject.inputSelector)
  );
  const buttonElement = form.querySelector(settingsObject.submitButtonSelector);
  toggleButtonsState(inputList, buttonElement, settingsObject);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkValidity(input, settingsObject);
      toggleButtonsState(inputList, buttonElement, settingsObject);
    });
  });
};

// @todo: Функция инициализации проверки инпутов форм
export const enableValidation = (settingsObject) => {
  const formList = Array.from(
    document.querySelectorAll(settingsObject.formSelector)
  );
  formList.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, settingsObject);
  });
};

// @todo: Функция очистки валидации форм
export const clearValidation = (form, settingsObject) => {
  const inputList = Array.from(
    form.querySelectorAll(settingsObject.inputSelector)
  );
  const buttonElement = form.querySelector(settingsObject.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(inputElement, settingsObject);
  });

  toggleButtonsState(inputList, buttonElement, settingsObject);
};

// @todo: Функция проверки наличия невалидных инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// @todo: Функция переключения состояния кнопок в формах
const toggleButtonsState = (inputList, buttonElement, settingsObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
  }
};
