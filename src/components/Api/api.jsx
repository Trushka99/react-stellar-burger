function checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

export function GetIngridients() {

  return fetch("https://norma.nomoreparties.space/api/ingredients", {
    method: "GET",
  }).then((res) => checkResponse(res))
}
