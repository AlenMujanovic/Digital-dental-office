const { User } = require('../models/user');
const error = require('./errorHandling/errorConstants');

/**
 * Ensure that requested User exists and is active
 */
module.exports.permissionAccess = (...roles) => async (req, res, next) => {
  try {
    const { _id: loggedInUser } = req.auth;

    const user = await User.findById(loggedInUser).lean();

    if (roles.length) {
      const { role } = user;
      if (!roles.includes(role)) throw new Error(error.FORBIDDEN);
    }

    if (!user || !user.isActive) {
      throw new Error(error.NOT_FOUND);
    }

    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};
