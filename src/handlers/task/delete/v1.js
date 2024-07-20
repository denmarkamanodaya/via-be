const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Tasks } = require('../../../models/mongodb/index');

module.exports.handler = middleware(async ({ pathParameters }) => {
  const { id } = pathParameters;

  try {
    const data = await Tasks.findByIdAndDelete(id);

    return {
      status: httpStatus.OK,
      code: httpResponseCodes.DELETE_RECORD_SUCCESS.value,
      data: httpResponseCodes.DELETE_RECORD_SUCCESS.value,
    };
  } catch (err) {
    return {
      status: httpStatus.BAD_REQUEST,
      code: httpResponseCodes.RECORD_EMPTY.value,
      data: httpResponseCodes.RECORD_EMPTY.value,
    };
  }
});
