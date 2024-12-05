import { fetchGithubProjects } from '../index';
import { Octokit } from '@octokit/rest';
import { MockOctokit } from './mocks';

jest.mock('@octokit/rest', () => MockOctokit);

describe('fetchGithubProjects', () => {
  const mockUsername = 'testuser';
  const mockToken = 'testtoken';
  const mockRepos = [
    {
      name: 'repo1',
      description: 'desc1',
      html_url: 'https://github.com/testuser/repo1',
      stargazers_count: 10,
      language: 'JavaScript',
    },
    {
      name: 'repo2',
      description: 'desc2',
      html_url: 'https://github.com/testuser/repo2',
      stargazers_count: 20,
      language: 'TypeScript',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch GitHub projects successfully with valid username and token', async () => {
    const octokit = new Octokit({
      auth: mockToken,
    });
    const mockReposResponse = { data: mockRepos };
    octokit.repos.listForUser.mockResolvedValue(mockReposResponse);

    const projects = await fetchGithubProjects(mockUsername, mockToken);
    expect(projects).toEqual(
      mockRepos.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
      }))
    );
  });

  it('should throw an error when fetching GitHub projects with invalid token', async () => {
    const octokit = new Octokit({
      auth: 'invalid-token',
    });
    octokit.repos.listForUser.mockRejectedValue(new Error('Invalid token'));

    await expect(fetchGithubProjects(mockUsername, 'invalid-token')).rejects.toThrow(
      'Error fetching projects:'
    );
  });

  it('should throw an error when fetching GitHub projects with non-existent username', async () => {
    const octokit = new Octokit({
      auth: mockToken,
    });
    octokit.repos.listForUser.mockRejectedValue(new Error('User not found'));

    await expect(fetchGithubProjects('non-existent-username', mockToken)).rejects.toThrow(
      'Error fetching projects:'
    );
  });

  it('should validate returned project data structure', async () => {
    const octokit = new Octokit({
      auth: mockToken,
    });
    const mockReposResponse = { data: mockRepos };
    octokit.repos.listForUser.mockResolvedValue(mockReposResponse);

    const projects = await fetchGithubProjects(mockUsername, mockToken);
    expect(projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          description: expect.any(String),
          url: expect.any(String),
          stars: expect.any(Number),
          language: expect.any(String),
        }),
      ])
    );
  });
});