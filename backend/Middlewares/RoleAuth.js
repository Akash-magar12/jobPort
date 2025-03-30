export const RoleAuth = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { role } = req.user;

      if (!role || !allowedRoles.includes(role)) {
        throw new Error("Forbidden");
      }
    } catch (error) {
      throw new Error("Unauthorized access");
    }
    next();
  };
};
