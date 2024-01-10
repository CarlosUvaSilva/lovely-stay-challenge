import { db } from './index';

export async function fetchUsers(location: string | null) {
  try {
    // Save user data to the database
    const fetchUsersQuery = `
      SELECT * FROM users
      WHERE ($1 IS NULL OR users.location = $1);
    `;

    const fetchedUsers = await db.any(fetchUsersQuery, location);
    return fetchedUsers;
  } catch (error: any) {
    throw new Error(`Error fetching users": ${error.message}`);
  }
}
