export class GitHubApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getCommits() {
    try {
      const res = await fetch(
        "https://api.github.com/repos/tim-musifullin/diploma-news-analyzer/commits?sha=master&per_page=20",
        {
          method: "GET",
          cors: false
        }
      );
      if (!res.ok) return;
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error(`Ошибка при запросе к серверу`);
    }
  }
}
