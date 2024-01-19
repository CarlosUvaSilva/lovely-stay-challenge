'use strict';

exports.up = function(db, callback) {
  const createTableQuery = `
    CREATE TABLE user_languages (
    user_id INT REFERENCES users(id),
    language_id INT REFERENCES programming_languages(id),
    PRIMARY KEY (user_id, language_id)
);
  `;
  db.runSql(createTableQuery, callback);
};

exports.down = function(db, callback) {
  const dropTableQuery = `DROP TABLE user_languages;`;
  db.runSql(dropTableQuery, callback);
};
