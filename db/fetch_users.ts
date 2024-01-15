import { db } from './index';

interface User {
  id: number;
  username: string;
  name: string;
  location: string;
  // Add other properties if available in the database table
}

export async function fetchUsers(
  location: string | null,
  languages: string | null
): Promise<User[]>  {
  try {
    let query = `
      SELECT DISTINCT users.*
      FROM users
    `;

    const conditions: string[] = [];
    const queryParams: any[] = [];

    if (languages) {
      query += `
        JOIN user_languages ul ON users.id = ul.user_id
        JOIN programming_languages pl ON ul.language_id = pl.id
      `;
      const languages_array = languages.split(',').map(lang => lang.trim());
      conditions.push(`pl.name = ANY($${conditions.length + 1}::text[])`);
      queryParams.push(languages_array);
    }

    if (location) {
      conditions.push(`users.location ILIKE $${conditions.length + 1}`);
      queryParams.push(`%${location}%`);
    }


    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const fetchedUsers: User[] = await db.any(query, queryParams);

    return fetchedUsers;
  } catch (error: any) {
    throw new Error(`Error fetching users": ${error.message}`);
  }
}
