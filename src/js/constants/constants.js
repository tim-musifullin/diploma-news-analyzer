// Константы главной страницы
export const resultsSeaction = document.querySelector(".results");
export const resultsCard = document.querySelector(".results__cards");
export const notFound = document.querySelector(".not-found");
export const preloader = document.querySelector(".preloader");
export const moreNews = document.querySelector(".results__button");
export const serverError = document.querySelector(".error-server");
export const searchForm = document.forms.field;
export const sumLoadCards = document.querySelector(".results__cards").children.length;
export const apiUrl = {
  "api": "636f55c68e584f72b302fe4050ffb444",
  "url": "https://newsapi.org/v2/everything?"
}
export const SUM_CARDS_AT_TIME = 3;
