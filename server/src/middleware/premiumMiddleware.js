const premiumMiddleware = (req, res, next) => {
  if (req.user.role !== "premium" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Premium access required" });
  }
  next();
};

export default premiumMiddleware;