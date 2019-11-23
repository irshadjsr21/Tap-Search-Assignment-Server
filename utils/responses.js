const responses = {
  // OK : 200
  ok: (res, body) => {
    responses.any(res, 200, body);
  },

  // Created : 201
  created: (res, body) => {
    responses.any(res, 201, body);
  },

  // Bad Request : 400
  badRequest: (res, body) => {
    responses.any(res, 400, body);
  },

  // Unauthorized : 401
  unAuthorized: (res, body) => {
    responses.any(res, 401, body);
  },

  // Not Found : 404
  notFound: (res, body) => {
    responses.any(res, 404, body);
  },

  // Conflict : 409
  conflict: (res, body) => {
    responses.any(res, 409, body);
  },

  // Error : 500
  error: (res, body) => {
    responses.any(res, 500, body);
  },

  // Any code, body
  any: (res, code, body) => {
    const newBody = body ? { ...body, code } : { code };
    res.status(code).json(newBody);
  }
};

module.exports = responses;
