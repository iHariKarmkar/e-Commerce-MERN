import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "You are not authorized!" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "You are not authorized!" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
