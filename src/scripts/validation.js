const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  button.setAttribute('disabled', true);
  button.classList.add(validationConfig.inactiveButtonClass);
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  button.removeAttribute('disabled');
  button.classList.remove(validationConfig.inactiveButtonClass);
  const errorElement = formElement.querySelector(`.${inputElement.name}_error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, validationConfig);
  });
};

export {enableValidation, clearValidation}