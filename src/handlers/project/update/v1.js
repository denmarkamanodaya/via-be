const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Projects } = require('../../../models/mongodb/index');

module.exports.handler = middleware(async ({ pathParameters, body }) => {
  const { id } = pathParameters;

  try {
    const data = await Projects.findByIdAndUpdate(id, body);

    return {
      status: httpStatus.OK,
      code: httpResponseCodes.UPDATE_RECORD_SUCCESS.value,
      data: httpResponseCodes.UPDATE_RECORD_SUCCESS.value,
    };
  } catch (err) {
    return {
      status: httpStatus.BAD_REQUEST,
      code: httpResponseCodes.RECORD_EMPTY.value,
      data: httpResponseCodes.RECORD_EMPTY.value,
    };
  }
});
