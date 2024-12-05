import { Octokit } from '@octokit/rest';

type Project = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
};

class GithubScraper {
  private octokit: Octokit;

  constructor(
    private username: string,
    private token: string
  ) {
    this.octokit = new Octokit({
      auth: this.token,
    });
  }

  async fetchProjects(): Promise<Project[]> {
    console.log(this.octokit);
    console.log('Fetching projects...');
    console.log(this.username);
    console.log(this.token);  

    try {
      const { data: repos } = await this.octokit.repos.listForUser({
        username: this.username,
        sort: 'updated',
        per_page: 10,
      });

      const projects = repos.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count ?? 0,
        language: repo.language ?? null,
      }));
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }
}

// Usage
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const USERNAME = process.env.USERNAME || '';

const scraper = new GithubScraper(USERNAME, GITHUB_TOKEN);
scraper
  .fetchProjects()
  .then((projects) => console.log('Done!', projects))
  .catch(console.error);
