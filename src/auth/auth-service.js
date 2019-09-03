const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const AuthService = {
  getUserWithUserName(db, user_nick_name) {
    return db("pinballer_users")
      .where({ user_nick_name })
      .first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      expiresIn: 10800,
      algorithm: "HS256"
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"]
    });
  },
  parseBasicToken(token) {
    return Buffer.from(token, "base64")
      .toString()
      .split(":");
  },

  getAdminInfo(db, nickname) {
    return db
      .select("admin_access")
      .from("pinballer_users")
      .where("pinballer_user_id", nickname);
  }
};

module.exports = AuthService;
