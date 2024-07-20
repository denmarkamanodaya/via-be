const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const mongoose = require('mongoose');
const secrets = require('config-dug').default;

let db = {};

mongoose.connect(secrets.MONGO_HOST);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db = Object.assign(db, model);
  });

module.exports = db;
