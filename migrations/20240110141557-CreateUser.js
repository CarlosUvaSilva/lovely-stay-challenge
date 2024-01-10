'use strict';

exports.up = function (db, callback) {
  const createTableQuery = `
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.runSql(createTableQuery, callback);
};

exports.down = function(db, callback) {
  const dropTableQuery = `DROP TABLE users;`;
  db.runSql(dropTableQuery, callback);
};
