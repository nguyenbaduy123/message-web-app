const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.userId = user.id;
      next();
    } catch (err) {
      console.log(err);
      return res.sendStatus(403);
    }
  }

  //   return res.sendStatus(401);
};

module.exports = verifyToken;
