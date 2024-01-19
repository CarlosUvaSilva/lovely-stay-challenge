import { fetchUsers } from '../db/fetch_users';

export async function displayUsersAction(
  location: string | null,
  languages: string | null
) {
  try {
    const users = await fetchUsers(location, languages);
    if (users.length === 0) {
      console.log("empty list");
    } else {
      console.table(users, ['id', 'username', 'name', 'location']);
    }
  } catch (error: any) {
    throw new Error(`Error fetching users": ${error.message}`);
  }
}
