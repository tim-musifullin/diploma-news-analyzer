export class Api {
  constructor(url, today, weekAgo, api) {
    this.url = url;
    this.today = today;
    this.week = weekAgo;
    this.api = api;
  }

  async getNews(words) {
    try {
      const res = await fetch(
        `${this.url}q=${words}&from=${this.week}&to=${this.today}&pageSize=100&language=ru&apiKey=${this.api}`,
        {
          method: "GET",
        }
      );
      if (!res.ok) return;
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`Ошибка при запросе к серверу`);
    }
  }
}
