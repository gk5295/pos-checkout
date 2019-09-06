/**
 * isAdmin Policy
 *
 * This policy is just checking if the user admin flag is set to `true`
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports.isAdmin = function isAdmin(req, res, next) {
  const { constants } = config;
  if (req.query && req.query.admin) return next();

  return res.forbidden({ message: constants.FORBIDDEN });
};
