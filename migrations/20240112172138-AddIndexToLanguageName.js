'use strict';

exports.up = function (db, callback) {
  const createTableQuery = `
    CREATE INDEX idx_programming_languages_name ON programming_languages (name);
  `;
  db.runSql(createTableQuery, callback);
};

exports.down = function (db, callback) {
  const dropTableQuery = `DROP INDEX idx_programming_languages_name;`;
  db.runSql(dropTableQuery, callback);
};
