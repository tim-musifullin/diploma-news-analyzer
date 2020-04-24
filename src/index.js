import "./style.css";
import "./about/about.css";
import "./analytics/analytics.css";

import { Api } from "./js/Api";
import { Card } from "./js/Card";
import { ResultCards } from "./js/ResultCards";
import { TimeUtil } from "./js/TimeUtil";
import { Vision } from "./js/Vision";
import { Reset } from "./js/Reset"
import { ValidateSearch } from "./js/components/ValidateSearch"

const field = document.querySelector(".search__field");
document.addEventListener("click", function () {
  if (event.target.classList.value === "search__input") {
    field.classList.add("search__field_active");
  } else {
    field.classList.remove("search__field_active");
  }
});


const resultsSeaction = document.querySelector(".results");
const resultsCard = document.querySelector(".results__cards");
const notFound = document.querySelector(".not-found");
const preloader = document.querySelector(".preloader");
const moreNews = document.querySelector(".results__button");
const serverError = document.querySelector(".error-server");
const searchForm = document.forms.field;
const sumLoadCards = document.querySelector(".results__cards").children.length;
const apiUrl = {
  "api": "636f55c68e584f72b302fe4050ffb444",
  "url": "https://newsapi.org/v2/everything?"
}
const SUM_CARDS_AT_TIME = 3;

const day = new Date();
const weekBack = new Date();
const vision = new Vision();
const card = new Card();
const date = new TimeUtil(day, weekBack);
const resultCards = new ResultCards(
  resultsCard,
  card,
  date,
  SUM_CARDS_AT_TIME
);
const reset = new Reset(
  notFound,
  serverError,
  resultsSeaction,
  preloader,
  resultsCard,
  vision);
const mainApi = new Api(apiUrl, date);
const validate = new ValidateSearch();

/* Блок слушателя для кнопки "Искать"*/
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Сбрасываем поведение браузера
  validate.searchInputBlock();
  const searchWord = event.target.querySelector("#search").value; // Сохраняем введеное слово
  if (validate.validateInput(searchWord)) { // Проверяем введено ли слово
    reset.clear(); // Убираем блок результата, если была ошибка - убраем, показываем прелоудер
    mainApi
    .getNews(searchWord) // Отправляем запрос на API
    .then((data) => {
      if (data.articles.length === 0) { // Проверяем данные с сервера
        reset.dataEmpty(); // Если данных нет, скрываем прелоудер и блок результатов, показываем ошибку
        validate.searchInputNonBlock();
      } else {
        console.log(data);
        reset.dataComplete(); // Если данные есть, скрываем прелоудер, отображаем данные
        validate.searchInputNonBlock();
        localStorage.setItem("searchWord", JSON.stringify(searchWord)); // Добавляем введеное слово для аналитики
        localStorage.setItem("totalResults", JSON.stringify(data.totalResults)); // Добавляем количетсво данных для аналитики
        localStorage.setItem("news", JSON.stringify(data)); // Добавляем данные для отображения
        resultCards.render(localStorage.getItem("news"), sumLoadCards); // Отрисовка результатов запроса
      }
    })
    .catch((err) => { // Обработка ошибки
      console.error(err);
      reset.dataError(); // Скрываем ненужные блоки, показываем ошибку
      validate.searchInputNonBlock();
    });
  } else {
    validate.searchInputNonBlock();
    reset.notInput(); // Скрываем прелоудер
  }
});

/* Блок слушателя для кнопки "Показать еще"*/
moreNews.addEventListener("click", () => {
  const sumLoadCards = resultsCard.children.length; // Сохряняем количество отрисованных на страницу карточек
  if (
    /* Проверяем, что количество отрисованных карточек и 3 новых карточек
      не больше общего количества данных с сервера */
    sumLoadCards + SUM_CARDS_AT_TIME >=
    JSON.parse(localStorage.getItem("news")).articles.length
  ) {
    moreNews.classList.add("container__hidden"); // Скрываем кнопку "Показать еще"
    resultsSeaction.classList.add("results-no-button"); // Добавляем дополнительный класс с отступами блоку results
  }
  resultCards.render(localStorage.getItem("news"), sumLoadCards); // Отрисовываем допольнительные +3 карточки
});

/* Слушатель для страницы */
window.onload = () => { // В случае если была перезагрузка
  if (localStorage.getItem("news") !== null) { // Проверяем локальное хранилище на наличие новостей
    vision.visible(resultsSeaction); // Отображаем блок с результатами
    resultCards.render(localStorage.getItem("news"), sumLoadCards); // Отрисовываем карточки
    document.querySelector("#search").value = JSON.parse(localStorage.getItem("searchWord")); // Добавляем искомое слово в инпут
  }
};
