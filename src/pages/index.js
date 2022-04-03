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
import { api } from '../components/Api.js';


//Модальные окна
const addCardModal = document.querySelector('.popup_type_add-card');
const avatarModal = document.querySelector('.popup_type_add-card');

//Кнопки
const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__add-btn');
const avatarButton = document.querySelector('.profile__avatar-edit-btn')

//Формы
const addCardForm = addCardModal.querySelector('.popup__form');
const avatarCardForm = avatarModal.querySelector('.popup__form');

// Поля ввода форм редактирования профиля
const inputProfileName = document.querySelector('.popup__input_type_username');
const inputProfileDescription = document.querySelector('.popup__input_type_description');

//селектор списка карточек
const cardListSelector = '.cards__elements';

//Соберем со страницы информацию о пользователе
const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__about',
  profileAvatarSelector: '.profile__avatar'
})

//Массив с фото подтягивается с сервера

// установим переменнную userId для отличия своих карточек
//от чужих. При первоначальном запуске она undefined
let userId;


api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)
    // при первичном запросе информации с сервера
    //установим значение  userId
    userId = res._id
    //console.log('res', res)
    // console.log(userId)
  })
  .catch((err) => {
    console.log(err)
  })

api.getInitialCards()
  .then(
    cardListServ => {
      //console.log('cardListServ', cardListServ),
      cardListServ.forEach(item => {
        cardList.addItem(createCard({
          name: item.name,
          link: item.link,
          likes: item.likes,
          id: item._id,
          userId: userId,
          ownerId: item.owner._id
        })
        )
      },
        //console.log('cardList', cardList)
      )
    });



function createCard(item) {
  const card = new Card(item, '.cards-template', handleCardClick,
    // handleDeleteClick
    (id) => {
      //console.log(id)
      confirmPopup.open()
      confirmPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.delete()
            confirmPopup.close()
          })
          .catch((err) => {
            console.log(err)
          });
      })
    },
    //Управляем состоянием лайка
    (id) => {
      if (card._isLiked()) {
        api.deleteLike(id)
          .then(res => card.setLikes(res.likes))
          .catch((err) => {
            console.log(err)
          });
      }
      else {
        api.addLike(id)
          .then(res => card.setLikes(res.likes))
          .catch((err) => {
            console.log(err)
          });
      }
    }
  );
  //console.log(card)
  const cardElement = card.getCardElement();
  return cardElement;
}

const cardList = new Section({
  // вместо InitialCards вставим пустой массив,
  // чтобы в дальнейшем подтянуть карточки с сервера
  items: [],
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
},
  cardListSelector
)
cardList.renderItems()



// Добавление новой карточки
const handleCardFormSubmit = (data) => {
  addCardPopup.renderLoading(true)
  api.addCard(data.title, data.link)
    .then(res => {
      //console.log('res', res)
      //  Создадим объект под новое фото
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })
      // { console.log('card', card) }
      cardList.addItem(card)
      addCardPopup.close();
    }
    )
    .catch((err) => {
      console.log(err)
    });
};


// Открываем форму для редактирования, подтягиваем в формы для ввода существующие данные
editProfileButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  inputProfileName.value = name;
  inputProfileDescription.value = job;
  editProfilePopup.open();
  formValidators['popup_edit'].resetValidation();
}
);

// Функция заменит аватар пользователя
const handleAvatarFormSubmit = (data) => {
  const { avatar } = data;
  avatarPopup.renderLoading(true);
  //console.log('avatar', data)
  api.editAvatar(avatar)
    .then(res => {
      // console.log(res)
      userInfo.setUserInfo(res.name, res.about, res.avatar)
    })
    .catch((err) => {
      console.log(err)
    });
  avatarPopup.close()
}
const handleProfileFormSubmit = (data) => {
  const { name, description } = data;
  editProfilePopup.renderLoading(true);
  api.editProfile(name, description)
    .then(() => {
      userInfo.setUserInfo(name, description)
    })
    .catch((err) => {
      console.log(err)
    });
  editProfilePopup.close()
};

const imagePopup = new PopupWithImage('.popup_type_image');
const editProfilePopup = new PopupWithForm('.popup_type_edit', handleProfileFormSubmit);
const addCardPopup = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
const confirmPopup = new PopupWithForm('.popup_type_delete-confirm');
const avatarPopup = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);


imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();


// При нажатии кнопки редактирования аватара
avatarButton.addEventListener('click', () => {
  avatarCardForm.reset();
  avatarPopup.open();
  formValidators['popup_edit_avatar'].resetValidation()
})

// При нажатии кнопки добавления
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardPopup.open();
  formValidators['popup_add_card'].resetValidation()
});

//Для отказа от импорта в файлы классов переменных, применим "мягкое связывание"
function handleCardClick(name, link) {
  imagePopup.open(name, link);
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
