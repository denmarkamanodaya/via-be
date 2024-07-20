const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Projects } = require('../../../models/mongodb/index');
const { projectValidation } = require('../../../utils/validators/project');
const logger = require('../../../common/logger');

module.exports.handler = middleware(async ({ body }) => {
  logger.info(`project-create] | ${JSON.stringify({ body })}`);

  const { title, members } = body;
  const data = await Projects.find({ title });

  if (data.length && data.length > 0) {
    return {
      status: httpStatus.CONFLICT,
      code: httpResponseCodes.RECORD_ALREADY_EXIST.value,
      data: httpResponseCodes.RECORD_ALREADY_EXIST.value,
    };
  }

  // check members count
  if (members && members.length > 5) {
    return {
      status: httpStatus.BAD_REQUEST,
      code: httpResponseCodes.MEMBERS_EXCEEDED.value,
      data: httpResponseCodes.MEMBERS_EXCEEDED.value,
    };
  }

  const cdata = await Projects.create(body);

  logger.info(`[project-create] | ${JSON.stringify({ cdata })}`);

  return {
    status: httpStatus.OK,
    code: httpResponseCodes.CREATE_RECORD_SUCCESS.value,
    data: cdata,
  };
}, projectValidation);
