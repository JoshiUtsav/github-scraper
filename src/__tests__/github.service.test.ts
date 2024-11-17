import { GitHubService } from "../services/github.service";

describe("GitHubService", () => {
  let service: GitHubService;

  beforeEach(() => {
    service = new GitHubService("test-token");
  });

  it("should fetch user projects", async () => {
    // Add your test implementation
  });
});
