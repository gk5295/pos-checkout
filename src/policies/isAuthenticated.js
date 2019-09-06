/**
  isAuthenticated policy blocks UNAUTHENTICATED users
 */

module.exports.isAuthenticated = function isAuthenticated(req, res, next) {
  const { constants } = config;

  if (req.query && req.query.auth) return next();

  return res.unAuthorized({ message: constants.ACCESS_TOKEN_NOTFOUND });
};
