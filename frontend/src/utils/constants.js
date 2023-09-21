export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://api.mariia.mesto.nomoredomainsrocks.ru';