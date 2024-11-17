import { Octokit } from "@octokit/rest";
import { ProjectData } from "../types";

export class GitHubService {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async fetchUserProjects(username: string): Promise<ProjectData[]> {
    const { data: repos } = await this.octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
    });

    return repos.map((repo) => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description || "",
      url: repo.html_url,
      stars: repo.stargazers_count,
      topics: repo.topics || [],
      lastUpdated: repo.updated_at,
      language: repo.language || "Not specified",
      owner: username,
    }));
  }
}
