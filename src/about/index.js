import './about.css';
import '../blocks/header/header.css';
import '../blocks/footer/footer.css';
import '../blocks/about/about.css';

import { GitHubApi } from "./../js/modules/GitHubApi";
import { CommitCard } from "./../js/components/CommitCards";
import { CommitCardList } from "./../js/components/CommitCardList";
import { TimeUtil } from "../js/TimeUtil"

const date = new TimeUtil();
const container = document.querySelector(".main-carousel");
const card = new CommitCard(container);
window.addEventListener('resize', () => card.flickity());
const cardList = new CommitCardList(card, date);

const gitHubApi = new GitHubApi();
gitHubApi.getCommits().then((data) => {
  cardList.renderCommits(data);
}).catch((error) => console.error(error));
