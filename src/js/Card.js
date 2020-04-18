export class Card {
  createCard(image, date, title, description, source) {
    if (image === null)
      image =
        "https://image.freepik.com/free-vector/blue-breaking-news-tv-background_1017-14201.jpg";
    const template = `<div class="card">
                <img src="${image}" alt="Обложка карточки" class="card__image">
                <p class="card__date">${date}</p>
                <div class="card__content">
                    <h4 class="card__title">${title}</h4>
                    <p class="card__description">${description}</p>
                </div>
                <p class="card__source">${source}</p>
            </div>`;
    return template;
  }
}
