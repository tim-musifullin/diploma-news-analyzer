export class Reset {
    constructor(notFound, serverError, resultsSeaction, preloader, resultsCard, vision) {
      this.notFound = notFound;
      this.serverError = serverError;
      this.resultsSeaction = resultsSeaction;
      this.preloader = preloader;
      this.resultsCard = resultsCard;
      this.vision = vision;
    }

    clear() {
      this.resultsCard.textContent = "";
      this.vision.hidden(this.notFound);
      this.vision.hidden(this.serverError);
      this.vision.hidden(this.resultsSeaction);
      this.vision.visible(this.preloader);
    }
}
