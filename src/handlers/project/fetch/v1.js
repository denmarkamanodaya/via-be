const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Users, Projects, Tasks } = require('../../../models/mongodb/index');

module.exports.handler = middleware(async ({ pathParameters }) => {
  const { id } = pathParameters;
  let membersObj = {};

  try {
    const data = await Projects.findById(id);

    if (data.members.length > 0) {
      membersObj = await Promise.all(
        data.members.map(async (member) => {
          return await Users.findById(member);
        })
      );
    }

    const tasks = await Tasks.find({ project_id: id });

    return {
      status: httpStatus.OK,
      code: httpResponseCodes.RETRIEVE_RECORD_LIST.value,
      data: {
        title: data.title,
        description: data.description,
        createdAt: data.createdAt,
        members: membersObj,
        tasks: tasks,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      status: httpStatus.BAD_REQUEST,
      code: httpResponseCodes.RECORD_EMPTY.value,
      data: httpResponseCodes.RECORD_EMPTY.value,
    };
  }
});
