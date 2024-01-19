import axios from 'axios';
import { fetchGithubUser } from '../../src/github/fetch_user';

jest.mock('axios'); // Mock the axios module

describe('fetchGithubUser', () => {
  it('should fetch user data from GitHub', async () => {
    const mockUser = {
      login: 'testuser',
      name: 'Test User',
      location: 'Lisbon'
    };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUser });

    const user = await fetchGithubUser('testuser');

    expect(user).toEqual(mockUser);
    expect(axios.get)
      .toHaveBeenCalledWith('https://api.github.com/users/testuser');
  });

  it('should throw an error if the GitHub API request fails', async () => {
    const username = 'testuser';
    const error = new Error(`Error fetching ${username} profile: API error`);
    (axios.get as jest.Mock).mockRejectedValue(error);

    await expect(fetchGithubUser(username))
      .rejects.toThrow(`Error fetching ${username} profile: API error`);
  });
});
