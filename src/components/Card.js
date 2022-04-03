//класс создаёт карточку с текстом и ссылкой на изображение:
export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    // id текущего пользователя
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.element');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
  // Функция, ставящая лайк
  // _likeHandler()  {
  //   console.log(this._likeButton);
  //   this._likeButton.classList.toggle('element__like-button_active')
  // };

  // Функция, удаляющая карточку
  delete() {
    this._cardElement.closest('.element').remove();
    // Лучше всего после удаления карточки очистить ссылку на DOM-элемент:
    this._cardElement = null;
  };

  //Установим слушатели событий
  _setEventListeners() {
    // При нажатии на корзину - удаление карточки
    this._deleteButton.addEventListener('click', () => { this._handleDeleteClick(this._id) });

    // При нажатии на сердце - ставим лайк
    this._likeButton.addEventListener('click', () => { this._handleLikeClick(this._id) });

    // При нажатии на картинку, она откроется в новом модальном окне
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
  // Управление состоянием лайка
  _isLiked() {
    const userWasLiked = this._likes.find(user => user._id === this._userId);
    return userWasLiked;
  }
  // Функция отобразит количество лайков у карточки
  setLikes(newLikes) {
    this._likes = newLikes;
    // const element = this.getCardElement()
    // console.log(element);
    const likeCountElement = this._cardElement.querySelector('.element__like-count');
    likeCountElement.textContent = this._likes.length

    // Проверка наличия лайка на карточке
//console.log(this._isLiked())
    if (this._isLiked()) {
      this._addLike()
    } else {
      this._removeLike()
    }
  }


  _addLike = () => {
    this._likeButton.classList.add('element__like-button_active');
  }

  _removeLike = () => {
    this._likeButton.classList.remove('element__like-button_active');
  }

  //Функция создания новой карточки
  getCardElement() {
    this._cardElement = this._template.cloneNode(true);
    //Поиск элементов
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._deleteButton = this._cardElement.querySelector('.element__delete-button');
    this._likeButton = this._cardElement.querySelector('.element__like-button');

    // Содержимое
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    this.setLikes(this._likes);

    // console.log (( `${this._userId + '-----------' + this._ownerId}`))
    //Сделаем отображение кнопки удаления только у наших карточек
    if (this._userId !== this._ownerId) {
      this._deleteButton.style.display = 'none'
    };

    return this._cardElement;
  };

};

