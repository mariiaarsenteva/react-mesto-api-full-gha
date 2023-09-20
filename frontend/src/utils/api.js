class Api {
  constructor (options) {
    this._url = options.baseUrl;
    // this._headers = options.headers
    // this._authorization = options.headers.authorization
  }

  _checkResponse (res) {
    return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
  }

  getInfo () {
    return fetch(`${this._url}/users/me`, {
      headers: {
         authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(this._checkResponse)
  }

  getCards () {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(this._checkResponse)
  }

  setUserInfo (data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    }).then(this._checkResponse)
  }

  setNewAvatar (data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._checkResponse)
  }

  addCard (data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`
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
        'Content-Type': 'application/json',
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

  removeCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(this._checkResponse)
  }
}

//создаем экземпляр класса Api
const api = new Api({
  baseUrl: NODE_ENV === 'production' ? BASE_URL : 'http://localhost:3000',
  headers: {
    // authorization: '9b4e0602-94a6-4942-a0d1-e6cd14f0d357',
    // 'Content-Type': 'application/json'
  }
});

export default api
