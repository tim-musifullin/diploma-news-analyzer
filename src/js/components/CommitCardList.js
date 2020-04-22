export class CommitCardList {
  constructor(card, container, date) {
    this.card = card;
    this.container = container;
    this.date = date;
  }

  renderCommits(data) {
    console.log(data);
    for(let i = 0; i < data.length; i++) {
      // if(data[i].author === null) continue;
      this.card.createCard(
        data[i].commit.committer.date,
        data[i].commit.author.name,
        data[i].commit.author.email,
        data[i].commit.message)
    }
    this.card.flickity();
  }
}
