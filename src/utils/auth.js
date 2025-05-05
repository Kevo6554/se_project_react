import { checkRes } from "./api"; // correct the import path

const BASE_URL = "http://localhost:3001";

// Function to register user

const registerUser = ({ name, email, password, avatar = "" }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  })
    .then(checkRes) // Use checkres
    .catch((error) => {
      console.error("Registration Error:", error);
      throw error;
    });
};

// function log in
const logIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkRes)
    .catch((error) => {
      console.error("Login Error:", error);
      throw error;
    });
};

// function user profile

const getUserProfile = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkRes)
    .catch((error) => {
      console.error("Get Profile Error:", error);
      throw error;
    });
};

export { registerUser, logIn, getUserProfile };
