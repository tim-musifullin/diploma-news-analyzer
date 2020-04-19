import "./analytics.css";
import "../blocks/header/header.css";
import "../blocks/footer/footer.css";

import { TimeUtil } from "./../js/TimeUtil";

const title = document.querySelector(".request__title");
const total = document.querySelector(".request__number_bold");

const searchWord = JSON.parse(localStorage.getItem("searchWord"));
const totalResults = JSON.parse(localStorage.getItem("totalResults"));

title.innerHTML = `Вы спросили: «${searchWord}»`;
total.innerHTML = `${totalResults}`;
