//класс настраивает валидацию полей формы
export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    //Можно вот так ключи достать
    //this._inputListSelector = settings.inputListSelector;
    this._form = form;
    this._inputLists = this._form.querySelectorAll(this._settings.inputListSelector);
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _showError(inputElement) {
    //А можно вот так  достать те же ключи внутри функции
    const { inputErrorClass, errorClass } = this._settings;
    const errorContainer = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(inputErrorClass);
    errorContainer.classList.add(errorClass);
    errorContainer.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement) {
    const { inputErrorClass, errorClass } = this._settings;
    const errorContainer = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(inputErrorClass);
    errorContainer.classList.remove(errorClass);
    errorContainer.textContent = '';
  };

  _validateInput(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement)
    } else {
      this._showError(inputElement, inputElement.validationMessage)
    }
    this.toggleButton();
  }

  toggleButton() {
    const { inactiveButtonClass } = this._settings;
    const isFormValid = this._form.checkValidity();
    if (isFormValid) {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  //метод для очистки ошибок и управления кнопкой
  resetValidation() {
    this.toggleButton(); //управляем кнопкой ==
    this._inputLists.forEach((inputElement) => {
      this._hideError(inputElement) //очищаем ошибки ==
    });
  }

  _setEventListeners() {
    this._inputLists.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement);
        this.toggleButton();
      })
    }
    )
  };
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
