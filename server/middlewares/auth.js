const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    console.log(token);
    if (!token || token === undefined) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
