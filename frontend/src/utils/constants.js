export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://api.mariia.mesto.nomoredomainsrocks.ru';