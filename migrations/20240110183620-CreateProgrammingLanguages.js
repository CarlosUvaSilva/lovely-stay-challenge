'use strict';

exports.up = function (db, callback) {
  const createTableQuery = `
    CREATE TABLE programming_languages (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE
    );
  `;
  db.runSql(createTableQuery, callback);
};

exports.down = function (db, callback) {
  const dropTableQuery = `DROP TABLE programming_languages;`;
  db.runSql(dropTableQuery, callback);
};
