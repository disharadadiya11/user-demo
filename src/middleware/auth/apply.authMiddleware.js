const { pathToRegexp } = require("path-to-regexp");
const { protectedRoutes } = require("./protected.routes");
const { authMiddleware } = require("./auth.middleware");

module.exports.applyAuthMiddleware = async (req, res, next) => {
  const matchRoutes = protectedRoutes.some((route) => {
    const routeRegex = pathToRegexp(route.path);
    return routeRegex.test(req.path) && route.methods.includes(req.method);
  });
  if (matchRoutes) {
    return authMiddleware(req, res, next);
  }
  next();
};
