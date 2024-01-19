import { db } from './index';

interface User {
  id: number;
  username: string;
  name: string;
  location: string;
  // Add other properties if available in the database table
}

interface QueryParams {
  [key: string]: string | string[];
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
    const queryParams: QueryParams = {};

    if (languages) {
      query += `
        JOIN user_languages ul ON users.id = ul.user_id
        JOIN programming_languages pl ON ul.language_id = pl.id
      `;

      const languages_array = languages.split(',').map(lang => lang.trim());
      conditions.push(`pl.name ILIKE ANY($/language/)`);
      queryParams['language'] = languages_array;
    }

    if (location) {
      conditions.push(`users.location ILIKE $/location/`);
      queryParams['location'] = `%${location}%`;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const fetchedUsers: User[] = await db.any(query, queryParams);
    return fetchedUsers;
  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
}
