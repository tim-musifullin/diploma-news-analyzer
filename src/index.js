import "./style.css";
import "./about/about.css";
import "./analytics/analytics.css";

import { Api } from "./js/Api";
import { Card } from "./js/Card";
import { ResultCards } from "./js/ResultCards";
import { TimeUtil } from "./js/TimeUtil";
import { Vision } from "./js/Vision";

let field = document.querySelector(".search__field");
document.addEventListener("click", function () {
  if (event.target.classList.value === "search__input") {
    field.classList.add("search__field_active");
  } else {
    field.classList.remove("search__field_active");
  }
});

const api = "636f55c68e584f72b302fe4050ffb444";
let today = new Date();
let weekAgo = new Date();
const url = `https://newsapi.org/v2/everything?`;

const resultsSeaction = document.querySelector(".results");
const resultsCard = document.querySelector(".results__cards");
const notFound = document.querySelector(".not-found");
const preloader = document.querySelector(".preloader");
const moreNews = document.querySelector(".results__button");
const serverError = document.querySelector(".error-server");

const SUM_CARDS_AT_TIME = 3;

const vision = new Vision();
const card = new Card();
const formateDate = new TimeUtil();
const resultCards = new ResultCards(
  resultsCard,
  card,
  formateDate,
  SUM_CARDS_AT_TIME
);

const mainApi = new Api(url, api);
const searchForm = document.forms.field;

const sumLoadCards = document.querySelector(".results__cards").children.length;

searchForm.addEventListener("submit", (event) => {
  resultsCard.innerHTML = "";
  vision.hidden(notFound);
  vision.hidden(serverError);
  event.preventDefault();
  vision.hidden(resultsSeaction);
  vision.visible(preloader);
  const searchWord = event.target.querySelector("#search").value;
  mainApi
    .getNews(searchWord)
    .then((data) => {
      if (data.articles.length === 0) {
        vision.hidden(resultsSeaction);
        vision.hidden(preloader);
        vision.visible(notFound);
      } else {
        console.log(data);
        vision.hidden(preloader);
        vision.visible(resultsSeaction);
        vision.hidden(notFound);
        localStorage.setItem("searchWord", JSON.stringify(searchWord));
        localStorage.setItem("totalResults", JSON.stringify(data.totalResults));
        localStorage.setItem("news", JSON.stringify(data));
        resultCards.render(localStorage.getItem("news"), sumLoadCards);
      }
    })
    .catch((err) => {
      console.error(err);
      vision.hidden(preloader);
      vision.visible(serverError);
    });
});

moreNews.addEventListener("click", () => {
  const sumLoadCards = resultsCard.children.length;
  if (
    sumLoadCards + SUM_CARDS_AT_TIME >=
    JSON.parse(localStorage.getItem("news")).articles.length
  ) {
    moreNews.classList.add("container__hidden");
    resultsSeaction.classList.add("results-no-button");
  }
  resultCards.render(localStorage.getItem("news"), sumLoadCards);
});

window.onload = () => {
  if (localStorage.getItem("news") !== null) {
    vision.visible(resultsSeaction);
    resultCards.render(localStorage.getItem("news"), sumLoadCards);
  }
};
