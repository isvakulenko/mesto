
export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
  }
  // Функция, ставящая лайк
  _likeHandler = (evt) => {
    evt.target.classList.toggle('element__like-button_active')
  };

  // Функция, удаляющая карточку
  _deleteHandler = (evt) => {
    evt.target.closest('.element').remove()
  };

  //Установим слушатели событий
  _setEventListeners() {
    // При нажатии на корзину - удаление карточки
    this._deleteButton.addEventListener('click', this._deleteHandler);

    // При нажатии на сердце - ставим лайк
    this._likeButton.addEventListener('click', this._likeHandler);

    // При нажатии на картинку, она откроется в новом модальном окне
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }


  //Функция создания новой карточки
  getCardElement() {
    const cardElement = this._template.cloneNode(true);
    //Поиск элементов
    this._cardImage = cardElement.querySelector('.element__image');
    this._cardTitle = cardElement.querySelector('.element__title');
    this._deleteButton = cardElement.querySelector('.element__delete-button');
    this._likeButton = cardElement.querySelector('.element__like-button');

    // Содержимое
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners()

    return cardElement;
  };

};

