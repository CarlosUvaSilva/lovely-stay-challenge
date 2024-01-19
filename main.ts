// Import required libraries
import 'dotenv/config';
import * as commander from 'commander';

import { getUserAction } from './src/actions/get_user';
import { displayUsersAction } from './src/actions/display_users';

// Create a new Commander program
const program = new commander.Command();

// Define the command and its description
program
  .command('get-user <username>')
  .description('Fetches a GitHub user profile')
  .action(async (username: string) => {
    try {
      await getUserAction(username);
    } catch (error: any) {
      console.error(error.message);
    }
  });

program
  .command('display-users')
  .description('Displays the users saved on the database')
  .option('-l, --location <string>', 'location filter')
  .option('--languages <string>', 'languages filter')
  .action(async (options) => {
    const location = options.location ?? null;
    const languages = options.languages ?? null;
    try {
      await displayUsersAction(location, languages);
    } catch (error: any) {
      console.error(error.message);
    }
  });
// Parse command-line arguments
program.parse(process.argv);
