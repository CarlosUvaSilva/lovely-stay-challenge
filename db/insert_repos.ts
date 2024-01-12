import { db } from './index';

export async function saveUserRepos(
  userId: string,
  languages: Set<string>
) {
  try {
    // Save user data to the database
    for (const language of languages) {
      const insertLanguageQuery = `
          INSERT INTO programming_languages (name)
          VALUES ($1)
          ON CONFLICT (name)
          DO UPDATE SET name = EXCLUDED.name
          RETURNING id;
        `;

      const languageResult = await db.one(insertLanguageQuery, [language]);

      // Link the user to the programming language
      const insertUserLanguageQuery = `
          INSERT INTO user_languages (user_id, language_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, language_id)
            DO NOTHING;
        `;

      await db.none(insertUserLanguageQuery, [userId, languageResult.id]);
    }

  } catch (error: any) {
    throw new Error(`Error saving languages: ${error.message}`);
  }
}
