import axios from 'axios';

export async function fetchGithubUserRepos(username: string) {
  try {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching "${username}" repos: ${error.message}`);
    } else {
      throw error;
    }
  }
}
