import { getCookie } from "../services/cookie";

const BASE_URL = {
  URL: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function getIngridients() {
  return fetch(`${BASE_URL.URL}/ingredients`, {
    method: "GET",
  }).then((res) => checkResponse(res));
}

export function postOrder(array) {
  return fetch(`${BASE_URL.URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      ingredients: array,
    }),
  }).then((res) => checkResponse(res));
}
export function registerUser(email, password, name) {
  return fetch(`${BASE_URL.URL}/auth/register`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then((res) => checkResponse(res));
}

export function sendPassword(email) {
  return fetch(`${BASE_URL.URL}/password-reset`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) => checkResponse(res));
}
export function changedPassword(pass, code) {
  return fetch(`${BASE_URL.URL}/password-reset/reset`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      password: pass,
      token: code,
    }),
  }).then((res) => checkResponse(res));
}
export function login(user) {
  return fetch(`${BASE_URL.URL}/auth/login`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).then((res) => checkResponse(res));
}

export const getUser = async () =>
  await fetch(`${BASE_URL.URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

export function logout() {
  return fetch(`${BASE_URL.URL}/auth/logout`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then((res) => checkResponse(res));
}
export function updateUser(data) {
  return fetch(`${BASE_URL.URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
    .then(res => checkResponse(res))
}