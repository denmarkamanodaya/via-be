const { Users, Projects, Tasks } = require('./src/models/mongodb/index');

(async () => {
  await Promise.all([Users.deleteMany({}), Projects.deleteMany({}), Tasks.deleteMany({})]);
})();
