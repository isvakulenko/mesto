class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err))
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
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err))
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
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err))
  }

  deleteLike(id) {
     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .catch((err) => console.log(err))
  }
  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
     method: 'PUT',
     headers: this._headers
   })
     .then(res =>
       res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
     .catch((err) => console.log(err))
 }
 editAvatar(avatar) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(res =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .catch((err) => console.log(err))
}
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '5ead7841-faa6-4ad8-8b47-2349a55e5a2a',
    'Content-Type': 'application/json'
  }
});
