// const baseUrl = 'https://api.mariia.mesto.nomoredomainsrocks.ru'
import { BASE_URL } from "./constants.js";

function getResData(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
}

export function registration(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getResData(res))
}

export function authorization(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getResData(res))
}

export function getUserData(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }})
  .then(res => getResData(res))
}