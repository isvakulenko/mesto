import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  initialCards,
  cardListSelector,
  popupSelector
} from "./constants.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";


//Модальные окна
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');
//const imageModal = document.querySelector('.popup_type_image');

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
// const imageModalFigureImage = imageModal.querySelector('.popup__figure-image');
// const imageModalFigureCaption = imageModal.querySelector('.popup__figure-caption');


const userInfo = new UserInfo ({profileNameSelector:'.profile__name', profileAboutSelector:'.profile__about'})


//Массив с фото перенесен в файл constants.js

//Функция создания новой карточки
// ()  => {imagePopup.open(item.name, item.link)}

function createCard(item) {
  const card = new Card(item, '.cards-template', handleCardClick);
  const cardElement = card.getCardElement();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    // const card = new Card(item, '.cards-template', handleCardClick);
    // const cardElement = card.getCardElement();
     cardList.addItem(createCard(item))
    //createCard(item)
  }
},
cardListSelector
)
cardList.renderItems()


const handleProfileFormSubmit = (data)=> {
const {name, description} = data;
  // profileName.textContent = name;
  // profileAbout.textContent = description;
  userInfo.setUserInfo(name, description)
  editProfilePopup.close()
};
// Открываем форму для редактирования, подтягиваем в формы для ввода существующие данные
editProfileButton.addEventListener('click', () => {
const {name, job} = userInfo.getUserInfo();
//console.log (data)
    inputProfileName.value = name;
    inputProfileDescription.value = job;
    editProfilePopup.open();
    formValidators['popup_edit'].resetValidation();
  }
  );

  // Добавление новой карточки
 const handleCardFormSubmit =  (data) => {
   console.log(data)
    //evt.preventDefault();
    // Создадим объект под новое фото
    const card = createCard({
      name: data.title,
      link: data.link
    })
    cardList.addItem(card)
    addCardPopup.close();
    console.log(data)
};

const imagePopup = new PopupWithImage('.popup_type_image')
const editProfilePopup = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit)
const addCardPopup = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit)

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();


//Функция добавит созданную карточку в начало списка
// function addCard(item) {
//   list.prepend(createCard(item));
// }

//*************При первоначальном запуске страницы****************
// К каждому элементу массива создадим экземпляр класса с карточкой

// initialCards.forEach((item) => {
//   addCard(item);
// });

//****************************************************************

//Функция, открывающая модальные окна
//  function openPopup(modal) {
//   modal.classList.add('popup_opened');
  //document.addEventListener('keydown', closeByEscape);
// };

// Функция, закрывающая модальные окна
// function closePopup(modal) {
//   modal.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// };

// Функция, закрывающая модальные окна по клавише Escape
// function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector('.popup_opened')
//     closePopup(openedPopup);
//   }
// };


//Объединим события закрытия popup по нажатию на крестик и нажатию за пределами окна - область overlay
//Находим все попапы в проекте и пробегаемся по ним, навешивая обработчик.

// const popups = document.querySelectorAll('.popup')
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup)
//     }
//     if (evt.target.classList.contains('popup__close')) {
//       closePopup(popup)
//     }
//   })
// })

// При нажатии кнопки добавления
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardPopup.open();
  //addCardFormValidator.resetValidation();
  formValidators['popup_add_card'].resetValidation()
});
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// editForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   profileName.textContent = inputProfileName.value;
//   profileAbout.textContent = inputProfileDescription.value;
//   closePopup(editModal)
// });




//Для отказа от импорта в файлы классов переменных, применим "мягкое связывание"
function  handleCardClick (name, link) {
  imagePopup.open(name, link) ;
}
// function handleCardClick(name, link) {
//   imageModalFigureImage.src = link   ;
//   imageModalFigureImage.alt = name;
//   imageModalFigureCaption.textContent = name;
//   openPopup(imageModal);
// }




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

// const editFormValidator = new FormValidator(ValidationConfig, editForm);
// const addCardFormValidator = new FormValidator(ValidationConfig, addCardForm);

// editFormValidator.enableValidation();
// addCardFormValidator.enableValidation();


// //Cоздадим экземпляры валидаторов всех форм (универсальный способ)
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(ValidationConfig);

