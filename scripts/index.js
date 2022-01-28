//Модальные окна
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');
const imageModal = document.querySelector('.popup_type_image');

//Кнопки
const editProfileButton = document.querySelector('.profile__edit-btn');
const closeEditModalButton = editModal.querySelector('.popup__close-btn');
const addCardButton = document.querySelector('.profile__add-btn');
const closeAddCardModalButton = addCardModal.querySelector('.popup__close-btn');
const imageModalCloseButton = imageModal.querySelector('.popup__close-btn');

//Информация из профиля
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//Формы
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');

//Формируем список карточек в список
const list = document.querySelector('.cards__elements');

// Шаблон под карточку
const cardTemplate = document.querySelector('.cards-template').content;

// Поля ввода форм редактирования профиля
const inputProfileName = document.querySelector('.popup__input_type_username');
const inputProfileDescription = document.querySelector('.popup__input_type_description');

// Поля ввода форм добавления карточки
const inputCardName = document.querySelector('.popup__input_type_card-name');
const inputCardLink = document.querySelector('.popup__input_type_card-link');

// Изображение и подпись для модального окна с фото
const imageModalFigureImage = imageModal.querySelector('.popup__figure-image');
const imageModalFigureCaption = imageModal.querySelector('.popup__figure-caption');

//Массив с фото перенесен в файл cards.js


//Функция создания новой карточки

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__title');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__like-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // При нажатии на корзину - удаление карточки
  deleteButton.addEventListener('click', deleteHandler);

  // При нажатии на сердце - ставим лайк
  likeButton.addEventListener('click', likeHandler);

  // При нажатии на картинку, она откроется в новом модальном окне
  cardImage.addEventListener('click', (evt) => { viewImageModal(evt.target.src, evt.target.alt) });

  return cardElement;
};

//Функция добавит созданную карточку в начало списка
function addCard(cardElement) {
  list.prepend(cardElement);
}

//*************При первоначальном запуске страницы****************
// К каждому элементу массива применим функцию по созданиюи добавлению карточек

initialCards.forEach(function (item) {
  addCard(createCard(item))
});
//****************************************************************

// Функция откроет изображение в отдельном окне
function viewImageModal(image, caption) {
  imageModalFigureImage.src = image;
  imageModalFigureImage.alt = caption;
  imageModalFigureCaption.textContent = caption;
  openPopup(imageModal);
}

// Функция, открывающая модальные окна
function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('mousedown', closeOnOverlay);
};

// Функция, закрывающая модальные окна
function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('mousedown', closeOnOverlay);
  };

// Функция, закрывающая модальные окна по клавише Escape
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

function closeOnOverlay(evt) {
  const popups = document.querySelectorAll('.popup');
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
    })
  })
};

// Функция, удаляющая карточку
function deleteHandler(evt) {
  evt.target.closest('.element').remove()
};

// Функция, ставящая лайк
function likeHandler(evt) {
  evt.target.classList.toggle('element__like-button_active')
};


// Открываем форму для редактирования, подтягиваем в формы для ввода существующие данные
editProfileButton.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileAbout.textContent;
  openPopup(editModal);
  toggleButton(editForm, {submitButtonSelector: '.popup__submit-btn', inactiveButtonClass: 'popup__submit-btn_disabled'})
}
);

// При нажатии на крестик окне редактирования
closeEditModalButton.addEventListener('click', () => closePopup(editModal));


// При нажатии кнопки добавления
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  openPopup(addCardModal);
  toggleButton(addCardForm, { submitButtonSelector: '.popup__submit-btn', inactiveButtonClass: 'popup__submit-btn_disabled' })
});

// При нажатии на крестик в окне добавления фото
closeAddCardModalButton.addEventListener('click', () => closePopup(addCardModal));

// При нажатии на крестик в модальном окне изображения
imageModalCloseButton.addEventListener('click', () => closePopup(imageModal));

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileDescription.value;
  closePopup(editModal)
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // Создадим объект под новое фото
  const fotoObj = {
    name: inputCardName.value,
    link: inputCardLink.value
  }
  addCard(createCard(fotoObj))
  closePopup(addCardModal);
});
