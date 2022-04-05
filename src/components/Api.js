class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

//метод проверяет ответ от сервера:
  _checkResponse (res) {
     return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    //передается только ссылка на метод.
    //Не нужно его вызывать.
    //Он сам вызовется, так как в then нужно передавать именно функцию,
    // а не вызов функции.
    .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  deleteLike(id) {
     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
     method: 'PUT',
     headers: this._headers
   })
   .then(this._checkResponse)
 }
 editAvatar(avatar) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(this._checkResponse)
}
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '5ead7841-faa6-4ad8-8b47-2349a55e5a2a',
    'Content-Type': 'application/json'
  }
});
