import { getCookie } from "../services/cookie";
import { TIngredientData, TOrderData, TUserData } from "./types";
const BASE_URL = {
  URL: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export function checkResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}
type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  data: Array<TIngredientData>;
  order: TOrderData;
  email?: string;
  name?: string;
  accessToken?: string;
  refreshToken?: string;
  user: TUserData;
  orders?: Array<TOrderData>;
};
// создаем функцию проверки на `success`
export const checkSuccess = (res: TResponseBody) => {
  if (res && res.success) {
    console.log(res);
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

export function getIngredients() {
  return fetch(`${BASE_URL.URL}/ingredients`, {
    method: "GET",
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}

export function postOrder(array: Array<string>) {
  return fetch(`${BASE_URL.URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },

    body: JSON.stringify({
      ingredients: array,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}
export function registerUser(email: string, password: string, name: string) {
  return fetch(`${BASE_URL.URL}/auth/register`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}

export function sendPassword(email: string | undefined) {
  return fetch(`${BASE_URL.URL}/password-reset`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}
export function changedPassword(pass: string, code: string) {
  return fetch(`${BASE_URL.URL}/password-reset/reset`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      password: pass,
      token: code,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}
export function login(user: { email: string; password: string }) {
  return fetch(`${BASE_URL.URL}/auth/login`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}

export function getUser() {
  return fetch(`${BASE_URL.URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}

export function logout() {
  return fetch(`${BASE_URL.URL}/auth/logout`, {
    method: "POST",
    headers: BASE_URL.headers,
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}
export function updateUser(data: TUserData) {
  return fetch(`${BASE_URL.URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}

export function getorder(number: number) {
  return fetch(`${BASE_URL.URL}/orders/${number}`, {
    method: "GET",
  })
    .then((res) => checkResponse(res))
    .then((res) => checkSuccess(res));
}
