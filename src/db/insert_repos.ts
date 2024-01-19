import { db } from './index';

export async function saveUserRepos(
  userId: string,
  languages: Set<string>
) {
  try {
    // Save user data to the database
    for (const language of languages) {
      const programming_language_data = {
        name: language,
      }

      const insertLanguageQuery = `
          INSERT INTO programming_languages (name)
          VALUES ($/name/)
          ON CONFLICT (name)
          DO UPDATE SET name = EXCLUDED.name
          RETURNING id;
        `;

      const languageResult = await db.one(
        insertLanguageQuery,
        programming_language_data
      );

      // Link the user to the programming language
      const user_language_data = {
        userId: userId,
        language_id: languageResult.id
      }
      const insertUserLanguageQuery = `
          INSERT INTO user_languages (user_id, language_id)
            VALUES ($/userId/, $/language_id/)
            ON CONFLICT (user_id, language_id)
            DO NOTHING;
        `;

      await db.none(insertUserLanguageQuery, user_language_data);
    }

  } catch (error: any) {
    throw new Error(`Error saving languages: ${error.message}`);
  }
}
