
import './index.css'; // добавьте импорт главного файла стилей

import { Card } from "../components/Card.js"
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
  validationConfig
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


//Модальные окна
const editModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_add-card');

//Кнопки
const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__add-btn');

//Формы
const addCardForm = addCardModal.querySelector('.popup__form');

// Поля ввода форм редактирования профиля
const inputProfileName = document.querySelector('.popup__input_type_username');
const inputProfileDescription = document.querySelector('.popup__input_type_description');

//селектор списка карточек
const cardListSelector = '.cards__elements';

//Соберем со страницы информацию о пользователе
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
    // Создадим объект под новое фото
    const card = createCard({
      name: data.title,
      link: data.link
    })
    cardList.addItem(card)
    addCardPopup.close();
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
  formValidators['popup_add_card'].resetValidation()
});

//Для отказа от импорта в файлы классов переменных, применим "мягкое связывание"
function  handleCardClick (name, link) {
  imagePopup.open(name, link) ;
}

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

enableValidation(validationConfig);

