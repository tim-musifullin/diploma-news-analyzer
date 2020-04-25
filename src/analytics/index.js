import "./analytics.css";
import "../blocks/header/header.css";
import "../blocks/footer/footer.css";

import { TimeUtil } from "./../js/TimeUtil";
import { Graph } from "./../js/components/Graph";

const title = document.querySelector(".request__title");
const total = document.querySelector(".request__number-news_bold");
const mentions = document.querySelector('.request__number-mention_bold');

const searchWord = JSON.parse(localStorage.getItem("searchWord"));
const totalResults = JSON.parse(localStorage.getItem("totalResults"));
const allNews = JSON.parse(localStorage.getItem('news'));

title.textContent = `Вы спросили: «${searchWord}»`;
total.textContent = `${totalResults}`;

const date = new Date();
const weekBack = new Date();
const timeUtil = new TimeUtil(date, weekBack);

export function dateAnalyticsFormat(date, number) {
  let dayWeek = date.getDay();
  switch (dayWeek - number)
  {
    case 1: dayWeek="пн"; break;
    case 2: dayWeek="вт"; break;
    case 3: dayWeek="ср"; break;
    case 4: dayWeek="чт"; break;
    case 5: dayWeek="пт"; break;
    case 6: dayWeek="сб"; break;
    case 0: dayWeek="вс"; break;
  }
  const day = (date.getDate() - number) + ', ' + (dayWeek);
  return day;
}

function searchMention(news, word) {
  const rgxp = new RegExp(`${word}`, 'gi');
  let mention = 0;
  for(let i = 0; i < news.articles.length; i++) {
    if(news.articles[i].title.match(rgxp)) {
      mention++;
    }
  }
  return mention;
}
const totalMentions = searchMention(allNews, searchWord);
mentions.textContent = `${totalMentions}`;


function numbersOfDayNews(news, date) {
  const rgxp = new RegExp(`${date}`, "g");
  let count = 0
  for(let i = 0; i < news.articles.length; i++) {
    if(news.articles[i].publishedAt.match(rgxp)) {
      count++;
    }
  }
  return count;
}

console.log(numbersOfDayNews(allNews, timeUtil.apiFormateFrom(1)));
console.log(allNews);

function createGraph(day, width, sum) {
  if(sum > 100) width = 100;
  if(sum < 3) width = 2;
  const template = 
      `<p class="analytics__week">${day}</p>
      <div class="analytics__quantity" style="width: ${width}%;">
        <span class="analytics__number">${sum}</span>
      </div>`;
  return template;
}

const table = document.querySelector('.analytics__table');

function renderTable(table, news) {
  for(let i = 0; i < 7; i++) {
    let weekAgo = timeUtil.apiFormateFrom(i);
    let day = dateAnalyticsFormat(date, i);
    let sum = numbersOfDayNews(news, weekAgo);
    table.insertAdjacentHTML("beforeend", createGraph(day, sum, sum));
  }
}
renderTable(table, allNews, date);