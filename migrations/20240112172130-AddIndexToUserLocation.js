'use strict';

exports.up = function (db, callback) {
  const createIndexQuery = `
    CREATE INDEX idx_users_location ON users(location);
  `;
  db.runSql(createIndexQuery, callback);
};

exports.down = function (db, callback) {
  const dropIndexQuery = `DROP INDEX idx_users_location;`;
  db.runSql(dropIndexQuery, callback);
};
