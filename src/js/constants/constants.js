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
  "api": "84d6f066d2d641bf8eb61c03beb4b074",
  "url": "https://praktikum.tk/news/v2/everything?"
  // https://newsapi.org/v2/everything?
}
export const SUM_CARDS_AT_TIME = 3;
