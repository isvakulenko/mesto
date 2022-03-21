
import './index.css'; // добавьте импорт главного файла стилей

import { Card } from "../components/Card.js"
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


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


//селектор списка карточек
const cardListSelector = '.cards__elements';
//селектор Popup
const popupSelector = '.popup'

const userInfo = new UserInfo ({profileNameSelector:'.profile__name', profileAboutSelector:'.profile__about'})


//Массив с фото перенесен в файл constants.js

function createCard(item) {
  const card = new Card(item, '.cards-template', handleCardClick);
  const cardElement = card.getCardElement();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
     cardList.addItem(createCard(item))
  }
},
cardListSelector
)
cardList.renderItems()


const handleProfileFormSubmit = (data)=> {
const {name, description} = data;
  userInfo.setUserInfo(name, description)
  editProfilePopup.close()
};

// Открываем форму для редактирования, подтягиваем в формы для ввода существующие данные
editProfileButton.addEventListener('click', () => {
const {name, job} = userInfo.getUserInfo();
    inputProfileName.value = name;
    inputProfileDescription.value = job;
    editProfilePopup.open();
    formValidators['popup_edit'].resetValidation();
  }
  );

  // Добавление новой карточки
 const handleCardFormSubmit =  (data) => {
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

// При нажатии кнопки добавления
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardPopup.open();
  //addCardFormValidator.resetValidation();
  formValidators['popup_add_card'].resetValidation()
});

//Для отказа от импорта в файлы классов переменных, применим "мягкое связывание"
function  handleCardClick (name, link) {
  imagePopup.open(name, link) ;
}
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

