
function showError (form, input, {inputErrorClass, errorClass} ) {
  const errorContainer = form.querySelector(`#error-${input.id}`);
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorClass);
  errorContainer.textContent = input.validationMessage;
}

function hideError (form, input,  {inputErrorClass, errorClass}) {
  const errorContainer = form.querySelector(`#error-${input.id}`);
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorClass);
  errorContainer.textContent = '';
};

function validateInput(form, input, classes) {
    if (input.validity.valid) {
    hideError(form, input, classes )
  } else {
    showError(form, input, classes)
  }
  toggleButton(form, classes);
}

function submitForm(evt) {
  evt.preventDefault();
}

function enableValidation({ formSelector, inputListselector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((form) => {
    form.addEventListener('submit', submitForm);
    const inputLists = form.querySelectorAll(inputListselector);
    inputLists.forEach((input) => {
      input.addEventListener('input', () => {
        validateInput(form, input, rest);
        toggleButton(form, rest);
      })
    })
  })
}

function toggleButton(form, {submitButtonSelector, inactiveButtonClass }) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = form.checkValidity();
  if (isFormValid) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  }
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputListselector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
