//класс отвечает за управление отображением информации о пользователе на странице

export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector}) {
 this._nameElement = document.querySelector(profileNameSelector);
 this._jobElement = document.querySelector(profileAboutSelector);
}

getUserInfo() {
  return {
    name: this._nameElement.textContent,
    job: this._jobElement.textContent
  }
}


setUserInfo(name, job) {
this._nameElement.textContent = name;
this._jobElement.textContent = job
}
}
