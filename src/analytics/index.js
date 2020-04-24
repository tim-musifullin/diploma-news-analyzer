import "./analytics.css";
import "../blocks/header/header.css";
import "../blocks/footer/footer.css";

import { TimeUtil } from "./../js/TimeUtil";

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
export function dateAnalyticsFormat(date) {
  let dayWeek = date.getDay();

  switch (dayWeek)
  {
    case 1: dayWeek="пн"; break;
    case 2: dayWeek="вт"; break;
    case 3: dayWeek="ср"; break;
    case 4: dayWeek="чт"; break;
    case 5: dayWeek="пт"; break;
    case 6: dayWeek="сб"; break;
    case 0: dayWeek="вс"; break;
  }
  const day = date.getDate() + ', ' + (dayWeek);
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

console.log(allNews);


const today = document.querySelector('#today');
today.textContent = dateAnalyticsFormat(date);
console.log(date.getDate());


// // "2020-04-23T16:34:42Z"
function numbersOfDayNews(news, date) {
  const rgxp = new RegExp(`${date}`, "g");
  for(let i = 0; i < news.articles.length; i++) {
    if(news.articles[i].publishedAt.match(rgxp)) {
      console.log("yes");
    }
  }
}
const timeNow = timeUtil.apiFormateTo();
const timeWeekAgo = timeUtil.apiFormateFrom(2);
console.log(timeWeekAgo);
numbersOfDayNews(allNews, timeWeekAgo);
