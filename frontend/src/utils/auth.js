import { baseUrl } from "./constants.js";

function getResData(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
}

export function registration(password, email) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getResData(res))
}

export function authorization(password, email, token) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
  .then(res => getResData(res))
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }})
  .then(res => getResData(res))
}