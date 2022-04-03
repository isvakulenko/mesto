import Popup from './Popup.js';
//класс PopupWithForm наследует от Popup.
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector('.popup__submit-btn');
    this._form = this._popup.querySelector('.popup__form');
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll('.popup__input');
    // console.log(this._inputList)
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    // console.log(this._formValues)
    return this._formValues;
  }
  changeSubmitHandler(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler
  };


  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
      //console.log('OK')
    } else {
      this._submitButton.textContent = this._saveButton.value;
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
