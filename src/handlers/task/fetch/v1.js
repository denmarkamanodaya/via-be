const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Tasks } = require('../../../models/mongodb/index');

module.exports.handler = middleware(async ({ pathParameters }) => {
  const { id } = pathParameters;

  try {
    const data = await Tasks.findById(id);

    return {
      status: httpStatus.OK,
      code: httpResponseCodes.RETRIEVE_RECORD_LIST.value,
      data,
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
