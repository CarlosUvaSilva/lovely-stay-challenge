import { fetchGithubUser } from '../github/fetch_user';
import { fetchGithubUserRepos } from '../github/fetch_user_repos';
import { saveUser } from '../db/insert_user';
import { saveUserRepos } from '../db/insert_repos';

export async function getUserAction(
  username: string
) {
  try {
    console.log("Fetching user data...")
    const userData = await fetchGithubUser(username);

    // fallback to empty string because DB is NOT NULL

    const savedUser = await saveUser(
      userData.login,
      userData.name ?? '',
      userData.location ?? ''
    );
    console.log("Fetching user repos...")
    const userRepos = await fetchGithubUserRepos(username);
    const languages = new Set<string>();
    for (const repo of userRepos) {
      if (repo.language) {
        languages.add(repo.language);
      }
    }
    await saveUserRepos(savedUser.id, languages);
    console.log(`User ID: ${savedUser.id}`);
    console.log(`User username: ${savedUser.username}`);
    console.log(`User name: ${savedUser.name}`);
    console.log(`User location: ${savedUser.location}`);
  } catch (error: any) {
    throw new Error(`Error fetching users": ${error.message}`);
  }
}
