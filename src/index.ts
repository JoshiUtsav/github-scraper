import { Octokit } from "@octokit/rest";
export { GitHubService } from "./services/github.service";
export { InstantDBAdapter } from "./adapters/InstantDB.adapter";
export * from "./types";


async function fetchGithubProjects(username: string, token: string) {
  const octokit = new Octokit({
    auth: token,
  });

  try {
    const { data: repos } = await octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 10, 
    });

    const projects = repos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
    }));

    console.log("Fetched Projects:", JSON.stringify(projects, null, 2));
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

// Example usage
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "your-token-here";
const USERNAME = "your-username";

fetchGithubProjects(USERNAME, GITHUB_TOKEN)
  .then(() => console.log("Done!"))
  .catch(console.error);
