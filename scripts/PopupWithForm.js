import Popup from './Popup.js';
//класс PopupWithForm наследует от Popup.
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  close() {
    super.close() ;
    this._form.reset();
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll('.popup__input');
    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;

  }
  setEventListeners() {
    super.setEventListeners()
      this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log('getInputValues result: ', this._getInputValues());
       this._handleFormSubmit(this._getInputValues());
     });
  }
}
