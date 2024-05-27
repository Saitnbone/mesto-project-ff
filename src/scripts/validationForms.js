// Функция вывода ошибок валидации форм
const showInputError = (input, errorValue, settingsObject) => {
  const error = document.querySelector(`.${input.id}-error`);
  error.classList.add(settingsObject.errorClass);
  input.classList.add(settingsObject.inputErrorClass);
  error.textContent = errorValue;
};

// Функция скрытия ошибок валидации форм
const hideInputError = (input, settingsObject) => {
  const error = document.querySelector(`.${input.id}-error`);
  error.classList.remove(settingsObject.errorClass);
  input.classList.remove(settingsObject.inputErrorClass);
  error.textContent = "";
  input.setCustomValidity("");
};

// Функция проверки валидности инпутов в формах
const checkValidity = (input, settingsObject) => {
  if (input.validity.patternMismatch) {
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

// Функция добавления слушателей инпутов форм
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

// Функция инициализации проверки инпутов форм
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

// Функция очистки валидации форм
export const clearValidation = (form, settingsObject) => {
  const inputList = Array.from(
    form.querySelectorAll(settingsObject.inputSelector)
  );
  const buttonElement = form.querySelector(settingsObject.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(inputElement, settingsObject);
  });

  form.reset();
  toggleButtonsState(inputList, buttonElement, settingsObject);
};

// Функция проверки наличия невалидных инпутов
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Функция переключения состояния кнопок в формах
const toggleButtonsState = (inputList, buttonElement, settingsObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
