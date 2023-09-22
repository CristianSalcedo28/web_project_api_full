export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  }

  _useFetch(method, url, body) {
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      return this._handleResponse(res);
    });
  }

  //para obtener las tarjetas iniciales
  getInitialCards() {
    return this._useFetch('GET', `${this._baseUrl}/cards`);
  }

  //para obtener los datos del usuario actual
  getUserInfo() {
    return this._useFetch('GET', `${this._baseUrl}/users/me`);
  }

  //para actualizar los datos del usuario actual con el nombre y descripción especificados.
  setUserInfo({name, about}) {
    return this._useFetch('PATCH', `${this._baseUrl}/users/me`, {name, about});
  }

  //addCard hara una petición POST al endpoint para crear una nueva tarjeta con el nombre y link especificados.
  addCard({name, link}) {
    return this._useFetch('POST', `${this._baseUrl}/cards`, {name, link});
  }

  //para eliminar la tarjeta con el id especificado.
  removeCard(cardId) {
    return this._useFetch('DELETE', `${this._baseUrl}/cards/${cardId}`);
  }

  //para actualizar el avatar del usuario actual con el link especificado.
  setUserAvatar(avatar) {
    return this._useFetch('PATCH', `${this._baseUrl}/users/me/avatar`, avatar);
  }

  //para agregar un like a la tarjeta con el id especificado.
  addLike(cardId) {
    return this._useFetch('PUT', `${this._baseUrl}/cards/likes/${cardId}`);
  }

  //para eliminar el like a la tarjeta con el id especificado.
  removeLike(cardId) {
    return this._useFetch('DELETE', `${this._baseUrl}/cards/likes/${cardId}`);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked === true) {
      return this._useFetch('PUT', `${this._baseUrl}/cards/likes/${cardId}`);
    } else {
      return this._useFetch('DELETE', `${this._baseUrl}/cards/likes/${cardId}`);
    }
  }
}

  const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/web_es_cohort_03',
  headers: {
    authorization: '12f0e9bd-a113-4001-9763-cce8c5e105dc',
    'Content-Type': 'application/json',
  },
});

export default api