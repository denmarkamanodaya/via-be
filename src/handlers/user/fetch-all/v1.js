const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Users } = require('../../../models/mongodb/index');

module.exports.handler = middleware(async () => {
  const data = await Users.find();

  if (data.length < 1) {
    return {
      status: httpStatus.BAD_REQUEST,
      code: httpResponseCodes.RECORD_EMPTY.value,
      data: httpResponseCodes.RECORD_EMPTY.value,
    };
  }

  return {
    status: httpStatus.OK,
    code: httpResponseCodes.RETRIEVE_RECORD_LIST.value,
    data: data,
  };
});
