const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkRes);
}

export function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function addItems({ name, imageUrl, weather, token }) {
  console.log("Adding item:", { name, imageUrl, weather });
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkRes);
}

function deleteCard(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function editProfile({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkRes);
}

function addCardLike(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function removeCardLike(cardId, token) {
  return fetch(`${baseUrl}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

function deleteItems(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
}

export const api = {
  addItems,
  getItems,

  deleteCard,
  editProfile,
  addCardLike,
  removeCardLike,
  deleteItems,
};
