export class GitHubApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getCommits() {
    try {
      const res = await fetch(
        "https://api.github.com/repos/tim-musifullin/diploma-news-analyzer/commits?sha=level-2&per_page=100",
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
