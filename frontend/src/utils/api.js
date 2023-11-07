export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setToken(token) {
    this._headers = {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  _handleResponse(res) {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  }

  _useFetch(method, url, body) {
    return fetch(url, {
      method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => this._handleResponse(res));
  }

  getInitialCards() {
    return this._useFetch('GET', `${this._baseUrl}/cards`);
  }

  getUserInfo() {
    return this._useFetch('GET', `${this._baseUrl}/users/me`);
  }

  setUserInfo({ name, about }) {
    return this._useFetch('PATCH', `${this._baseUrl}/users/me`, { name, about });
  }

  addCard({ name, link }) {
    return this._useFetch('POST', `${this._baseUrl}/cards`, { name, link });
  }

  removeCard(cardId) {
    return this._useFetch('DELETE', `${this._baseUrl}/cards/${cardId}`);
  }

  setUserAvatar(avatar) {
    return this._useFetch('PATCH', `${this._baseUrl}/users/me/avatar`, avatar);
  }

  addLike(cardId) {
    return this._useFetch('PUT', `${this._baseUrl}/cards/likes/${cardId}`);
  }

  removeLike(cardId) {
    return this._useFetch('DELETE', `${this._baseUrl}/cards/likes/${cardId}`);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked === true) {
      return this._useFetch('PUT', `${this._baseUrl}/cards/likes/${cardId}`);
    }
    return this._useFetch('DELETE', `${this._baseUrl}/cards/likes/${cardId}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.wdtt.chickenkiller.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
