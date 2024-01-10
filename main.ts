// Import required libraries
import 'dotenv/config';
import * as commander from 'commander';
import { fetchUser } from './github/fetch_user';
import { saveUser } from './db/insert_user';

// Create a new Commander program
const program = new commander.Command();

// Define the command and its description
program
  .command('get-user <username>')
  .description('Fetches a GitHub user profile')
  .action(async (username: string) => {
    try {
      const userData = await fetchUser(username);
      // fallback to empty string because DB is NOT NULL
      const savedUser = await saveUser(
        userData.login,
        userData.name ?? '',
        userData.location ?? ''
      );
      console.log(`User ID: ${savedUser.id}`);
      console.log(`User username: ${savedUser.username}`);
      console.log(`User name: ${savedUser.name}`);
      console.log(`User location: ${savedUser.location}`);
    } catch (error: any) {
      console.error(error.message);
    }
  });
// Parse command-line arguments
program.parse(process.argv);
