export class Card {
  createCard(image, date, title, description, source, url) {
    if (image === null) {
      image = "src/images/default.jpg";
    }
    image.naturalHeight;
    const template = `<a href="${url}" target="_blank" class="card">
                <img src="${image}" alt="Обложка новости" onerror="this.style.backgroundImage='./images/default.jpg'" class="card__image">
                <p class="card__date">${date}</p>
                <div class="card__content">
                    <h4 class="card__title">${title}</h4>
                    <p class="card__description">${description}</p>
                </div>
                <p class="card__source">${source}</p>
            </a>`;
    return template;
  }
}
