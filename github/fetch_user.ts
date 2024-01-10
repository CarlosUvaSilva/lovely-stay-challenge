import axios from 'axios';

export async function fetchUser(username: string) {
  try {
    const url = `https://api.github.com/users/${username}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching "${username}" profile: ${error.message}`);
    } else {
      throw error;
    }
  }
}
