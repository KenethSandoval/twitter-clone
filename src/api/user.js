import { API_HOST } from '../utils/constant';
import { getTokenApi } from './auth';

//Obtiene los datos del usuario segun el endpoint de la api
export function getUserApi(id) {
  const url = `${API_HOST}/verperfil?id=${id}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`
    }
  }

  return fetch(url, params).then(response => {
    //eslint-disable-next-line no-throw-literal
    if(response.status >= 400) throw null;
    return response.json();
  }).then(result => {
    return result;
  }).catch(error => {
    return error;
  });
}

export function uploadBannerApi(file) {
  const url = `${API_HOST}/subirBanner`;

  const formData = new FormData();
  formData.append("banner", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`
    },
    body: formData
  }

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch((error => {
      return error;
    }));
}

export function uploadAvatarApi(file) {
  const url = `${API_HOST}/subirAvatar`;

  const formData = new FormData();
  formData.append("avatar", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`
    },
    body: formData
  }

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch((error => {
      return error;
    }));
}

export function updateInfoApi(data) {
  const url = `${API_HOST}/modificarPerfil`;

  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`
    },
    body: JSON.stringify(data)
  }

  return fetch(url, params)
    .then(response => {
      return response;
    })
    .catch((error => {
      return error;
    }));
}
