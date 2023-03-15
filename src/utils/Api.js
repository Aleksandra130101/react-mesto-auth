class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);

  }
  
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    })
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    })
  }


  updateUserInfo(user) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    })
  }

  updateAvatar(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    })
  }

  addNewCard(user) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        link: user.image
      }),
    })
  }

  putLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  deleteLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: '18c1f460-1209-46d8-b484-04ad7ddb3f47',
    'Content-Type': 'application/json'
  },
});