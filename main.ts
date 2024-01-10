// Import required libraries
import 'dotenv/config';
import * as commander from 'commander';
import { fetchGithubUser } from './github/fetch_user';
import { saveUser } from './db/insert_user';
import { fetchUsers } from './db/fetch_users';

// Create a new Commander program
const program = new commander.Command();

// Define the command and its description
program
  .command('get-user <username>')
  .description('Fetches a GitHub user profile')
  .action(async (username: string) => {
    try {
      const userData = await fetchGithubUser(username);
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

program
  .command('display-users')
  .description('Displays the users saved on the database')
  .option('-l, --location <string>', 'location filter')
  .action(async (options) => {
    console.log(options)
    const location = options.location ?? null;
    try {
      const users = await fetchUsers(location);
      if (users.length === 0) {
        console.log("empty list");
      } else {
        console.table(users, ['id', 'username', 'name', 'location']);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  });
// Parse command-line arguments
program.parse(process.argv);
