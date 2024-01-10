import pgPromise from 'pg-promise';

// Create a new instance of pg-promise
const pgp = pgPromise();

// Configure the database connection

const db = pgp({
  connectionString: process.env.DATABASE_URL,
});

export { db };
