const middyCore = require('@middy/core');
const httpHeaderNormalizer = require('@middy/http-header-normalizer');
const requestResponseMiddleware = require('./request-response-middleware');
const validationMiddleware = require('./validation-middleware');

module.exports.defaultMiddleware = (fn, schema) =>
  middyCore(fn).use(httpHeaderNormalizer()).use(requestResponseMiddleware()).use(validationMiddleware(schema));
