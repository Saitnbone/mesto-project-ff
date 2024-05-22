//
const userInformation = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/users/me ", {
    method: "GET",
    headers: {
      authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    res.status;
    return res.json().then((result) => {
      console.log(result);
      console.log(result.name);
      console.log(result.about);
    });
  });
};

userInformation();

// @todo:
export const cardsInformation = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-14/cards", {
    headers: {
      authorization: "33599029-0076-4e00-ad12-21cae39d69c9",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    res.status;
    return res.json();
  });
};

cardsInformation();
