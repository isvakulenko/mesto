import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./constants.js";


//Модальные окна
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');
export const imageModal = document.querySelector('.popup_type_image');

//Кнопки
const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__add-btn');

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
export const imageModalFigureImage = imageModal.querySelector('.popup__figure-image');
export const imageModalFigureCaption = imageModal.querySelector('.popup__figure-caption');

//Массив с фото перенесен в файл constants.js

//Функция создания новой карточки

//Функция добавит созданную карточку в начало списка
function addCard(cardElement) {
  list.prepend(cardElement);
}

//*************При первоначальном запуске страницы****************
// К каждому элементу массива создадим экземпляр класса с карточкой


initialCards.forEach((item) => {
  const card = new Card(item, '.cards-template')
  addCard(card.createCard());
});

//****************************************************************

//Функция, открывающая модальные окна
export function openPopup(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция, закрывающая модальные окна
function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Функция, закрывающая модальные окна по клавише Escape
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};


// Открываем форму для редактирования, подтягиваем в формы для ввода существующие данные
editProfileButton.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileAbout.textContent;
  openPopup(editModal);
  editFormValidator.toggleButton();
}
);

//Объединим события закрытия popup по нажатию на крестик и нажатию за пределами окна - область overlay
//Находим все попапы в проекте и пробегаемся по ним, навешивая обработчик.

const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

// При нажатии кнопки добавления
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  openPopup(addCardModal);
  addCardFormValidator.toggleButton();
});
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileAbout.textContent = inputProfileDescription.value;
  closePopup(editModal)
});

// Добавление новой карточки
addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // Создадим объект под новое фото
  const fotoObj = {
    name: inputCardName.value,
    link: inputCardLink.value
  }
  const card = new Card(fotoObj, '.cards-template')
  addCard(card.createCard());
  closePopup(addCardModal);
});

//Настройки для проверки элементов форм

const ValidationConfig = {
  formSelector: '.popup__form',
  inputListSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//Создадим экземпляр класса для проверки данных каждой формы

const editFormValidator = new FormValidator(ValidationConfig, editForm);
const addCardFormValidator = new FormValidator(ValidationConfig, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
