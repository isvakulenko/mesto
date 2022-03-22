import Popup from './Popup.js';
//класс PopupWithImage наследует от Popup.
//перезаписывать родительский метод open
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__figure-image');
    this._caption = this._popup.querySelector('.popup__figure-caption');
  }
  open(name, link) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  };
}
