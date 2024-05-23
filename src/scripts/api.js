// @todo: Объект конфигурации для API-запросов
const config = {};

// @todo: API-запрос для получения собственной информации
export const fetchGetUserInformation = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me", {
    method: "GET",
    headers: {
      authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error, Status is: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      return null;
    });
};

// @todo: API-запрос для изменения данных о пользователе
export const fetchChangeProfileInformation = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me", {
    method: "PATCH",
    headers: {
      authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Marie Skłodowska Curie",
      about: "Physicist and Chemist",
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error, Status is: ${res.status}`);
      }
      return res.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      return null;
    });
};

// @todo: API-запрос для добавления новой карточки
export const fetchAddNewCard = (newCardData) => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
    method: "POST",
    body: JSON.stringify({
      name: newCardData.name,
      link: newCardData.link,
    }),
    headers: {
      authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error, Status is: ${res.status}`);
      }
      return res.json();
    })
    .then((cardData) => {
      console.log("Card added successfully:", cardData);
      return cardData;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      return null;
    });
};

// @todo: API-запрос для получения информации о карточках
export const fetchGetCardsInformation = () => {
  return (
    fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
      method: "GET",
      headers: {
        authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error, Status is: ${res.status}`);
        }
        return res.json();
      })
      // .then((result) => {
      //   console.log(result);
      // })
      .catch((error) => {
        console.error("Error fetching cards data:", error);
        return [];
      })
  );
};

// @todo: API-запрос для получения информации о карточках
export const fetchDeleteCardInformation = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error, Status is: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching cards data:", error);
      return null;
    });
};

// @todo: API-запрос для добавления лайка карточки
export const fetchAddLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error, Status is: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching cards data:", error);
      return null;
    });
};

// @todo: API-запрос для удаления лайка карточки
export const fetchRemoveLike = (cardId) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error, Status is: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching cards data:", error);
      return null;
    });
};
