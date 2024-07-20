const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Tasks, Projects } = require('../../../models/mongodb/index');
const { taskValidation } = require('../../../utils/validators/task');
const logger = require('../../../common/logger');

module.exports.handler = middleware(async ({ headers, body }) => {
  logger.info(`task-create] | ${JSON.stringify({ body })}`);

  const { title } = body;
  const { project_id } = headers;

  const project = await Projects.findById(project_id);

  if (!project) {
    return {
      status: httpStatus.NOT_FOUND,
      code: httpResponseCodes.RECORD_NOT_FOUND.value,
      data: httpResponseCodes.RECORD_NOT_FOUND.value,
    };
  }

  const data = await Tasks.find({ title });

  if (data.length > 0) {
    return {
      status: httpStatus.CONFLICT,
      code: httpResponseCodes.RECORD_ALREADY_EXIST.value,
      data: httpResponseCodes.RECORD_ALREADY_EXIST.value,
    };
  }

  body.project_id = project_id;
  const cdata = await Tasks.create(body);

  logger.info(`[task-create] | ${JSON.stringify({ cdata })}`);

  return {
    status: httpStatus.OK,
    code: httpResponseCodes.CREATE_RECORD_SUCCESS.value,
    data: cdata,
  };
}, taskValidation);
