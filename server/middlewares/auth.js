const jwt = require("jsonwebtoken");
const JWT_SECRET = `*LZ#uu]C{Z'RTAty<)gb9N[ch)V*t8{F=!afk.(=z#KnTQ:Aq%`;
const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token || token === undefined) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied" });
    }

    const verified = jwt.verify(JWT_SECRET);

    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
