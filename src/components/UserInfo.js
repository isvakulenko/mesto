//класс отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector, profileAvatarSelector}) {
 this._nameElement = document.querySelector(profileNameSelector);
 this._jobElement = document.querySelector(profileAboutSelector);
 this._avatarElement = document.querySelector(profileAvatarSelector)
}

getUserInfo () {
  return {
    name: this._nameElement.textContent,
    job: this._jobElement.textContent,
    avatar: this._avatarElement.src
  }
}


setUserInfo (name, job, avatar) {
this._nameElement.textContent = name;
this._jobElement.textContent = job;
this._avatarElement.src = avatar
}
}
