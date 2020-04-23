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
    notInput() {
      this.vision.hidden(this.preloader);
    }

    dataEmpty() {
      this.vision.hidden(this.resultsSeaction);
      this.vision.hidden(this.preloader);
      this.vision.visible(this.notFound);
    }

    dataComplete() {
      this.vision.hidden(this.preloader);
      this.vision.visible(this.resultsSeaction);
      this.vision.hidden(this.notFound);
    }
    dataError() {
      this.vision.hidden(this.preloader);
      this.vision.visible(this.serverError);
    }
}
