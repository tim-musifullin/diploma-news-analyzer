import { TimeUtil } from "./TimeUtil";

export class Api {
  constructor(url, api) {
    this.url = url;
    this.api = api;
    this.date = new TimeUtil();
  }

  async getNews(words) {
    try {
      const res = await fetch(
        `${
          this.url
        }q=${words}&from=${this.date.apiFormateFrom()}&to=${this.date.apiFormateTo()}&pageSize=100&sortBy=publishedAt&language=ru&apiKey=${
          this.api
        }`,
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
