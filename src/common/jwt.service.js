const jwt = require("jsonwebtoken");

module.exports = class JwtService {
  constructor() {
    this.secret = process.env.JWT_SECRET_KEY;
    this.expire_in = process.env.JWT_EXPIRES_IN;
  }

  //-------------------------------------------------------- [ token ] -----------------------------------------------------------------
  async generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.expire_in });
  }

  async verifyToken(token) {
    return jwt.verify(token, this.secret);
  }
};
