const httpStatus = require('http-status');
const { defaultMiddleware: middleware } = require('../../../middlewares/middy');
const { httpResponseCodes } = require('../../../common/response-codes');
const { Users, Tasks } = require('../../../models/mongodb/index');
const { taskValidation } = require('../../../utils/validators/task');

module.exports.handler = middleware(async ({ pathParameters, body }) => {
  const { id } = pathParameters;

  try {
    const { assigned_to } = body;

    if (assigned_to) {
      const user = await Users.findById(assigned_to);

      if (!user) {
        return {
          status: httpStatus.NOT_FOUND,
          code: httpResponseCodes.RECORD_NOT_FOUND.value,
          data: httpResponseCodes.RECORD_NOT_FOUND.value,
        };
      }
    }

    body.assigned_to = assigned_to ?? null;
    await Tasks.findByIdAndUpdate(id, body);

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
}, taskValidation);
