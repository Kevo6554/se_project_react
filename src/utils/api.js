const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkRes);

  function checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
  }

  function addItems({ name, imageUrl, weather }) {
    console.log("Adding item:", { name, imageUrl, weather });
    return fetch(`${baseUrl}/items`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, imageUrl, weather }),
    }).then(checkRes);
  }

  function deleteCard(cardId) {
    return fetch(`${baseUrl}/items/${cardId}`, {
      method: "DELETE",
    }).then(checkRes);
  }
}

export { addItems, getItems, checkRes, deleteCard };
