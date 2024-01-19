import { db } from './index';

export async function saveUser(
  username: string,
  name: string,
  location: string
) {
  try {
    const data = {
      username: username,
      name: name,
      location: location,
    };
    // Save user data to the database
    const insertUserQuery = `
      INSERT INTO users (username, name, location)
      VALUES ($/username/, $/name/, $/location/)
      ON CONFLICT (username) DO UPDATE SET
        name = EXCLUDED.name,
        location = EXCLUDED.location
      RETURNING *;
      `;

    const savedUser = await db.one(insertUserQuery, data);
    return savedUser;
  } catch (error: any) {
    throw new Error(`Error saving "${name}": ${error.message}`);
  }
}
