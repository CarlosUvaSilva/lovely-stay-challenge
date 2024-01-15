import { db } from './index';

export async function saveUser(
  username: string,
  name: string,
  location: string
) {
  try {
    // Save user data to the database
    const insertUserQuery = `
      INSERT INTO users (username, name, location)
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO UPDATE SET
        name = EXCLUDED.name,
        location = EXCLUDED.location
      RETURNING *;
    `;

    const savedUser = await db.one(insertUserQuery, [username, name, location]);
    return savedUser;
  } catch (error: any) {
    throw new Error(`Error saving "${name}": ${error.message}`);
  }
}
