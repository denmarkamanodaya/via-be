const { Users, Projects, Tasks } = require('./src/models/mongodb/index');

(async () => {
  await Promise.all([
    Users.insertMany([
      {
        first_name: 'Test User 1',
        last_name: 'Test User 1',
        email: 'test_user_1@test.com',
      },
      {
        first_name: 'Test User 2',
        last_name: 'Test User 2',
        email: 'test_user_2@test.com',
      },
      {
        first_name: 'Test User 3',
        last_name: 'Test User 3',
        email: 'test_user_3@test.com',
      },
      {
        first_name: 'Test User 4',
        last_name: 'Test User 4',
        email: 'test_user_4@test.com',
      },
      {
        first_name: 'Test User 5',
        last_name: 'Test User 5',
        email: 'test_user_5@test.com',
      },
    ]),

    Projects.create({
      title: 'Test Project Title',
      description: 'Test Project Description',
    }),

    Tasks.create({
      title: 'Test Task Title',
      description: 'Test Task Description',
    }),
  ]);
})();
