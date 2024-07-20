const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Users } = require('../../../models/mongodb/index');
const { userValidation } = require('../../../utils/validators/user');
const logger = require('../../../common/logger');

module.exports.handler = middleware(async ({ body }) => {
  logger.info(`[user-create] | ${JSON.stringify({ body })}`);

  const data = await Users.find({ email: body.email });

  if (data.length > 0) {
    return {
      status: httpStatus.CONFLICT,
      code: httpResponseCodes.RECORD_ALREADY_EXIST.value,
      data: httpResponseCodes.RECORD_ALREADY_EXIST.value,
    };
  }

  const cdata = await Users.create(body);

  logger.info(`[user-create] | ${JSON.stringify({ cdata })}`);

  return {
    status: httpStatus.OK,
    code: httpResponseCodes.CREATE_RECORD_SUCCESS.value,
    data: cdata,
  };
}, userValidation);
