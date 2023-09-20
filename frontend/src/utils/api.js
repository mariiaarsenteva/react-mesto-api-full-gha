class Api {
  constructor (options) {
    this._url = options.baseUrl;
    // this._headers = options.headers
    // this._authorization = options.headers.authorization
  }

  _checkResponse (res) {
    return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
  }

  getInfo (token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    }).then(this._checkResponse)
  }

  getCards (token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    }).then(this._checkResponse)
  }

  setUserInfo (data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then(this._checkResponse)
  }

  setNewAvatar (data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse)
  }

  addCard (data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    }).then(this._checkResponse)
  }

  addLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'https://api.mariia.mesto.nomoredomainsrocks.ru',
        // "Authorization" : `Bearer ${token}`
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(this._checkResponse)
  }

  removeLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // "Authorization" : `Bearer ${token}`
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(this._checkResponse)
  }

  removeCard (cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    }).then(this._checkResponse)
  }
}

//создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'http://localhost:3000',
  // headers: {
  //   authorization: '9b4e0602-94a6-4942-a0d1-e6cd14f0d357',
  //   'Content-Type': 'application/json'
  // }
});

export default api
