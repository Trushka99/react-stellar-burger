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
