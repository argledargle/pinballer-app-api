const express = require("express");
const AuthService = require("./auth-service");
const { requireAuth } = require("../middleware/jwt-auth");

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.post("/login", jsonBodyParser, (req, res, next) => {
  const { user_nick_name, user_password } = req.body;
  const loginUser = { user_nick_name, user_password };

  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      });
  AuthService.getUserWithUserName(req.app.get("db"), loginUser.user_nick_name)
    .then(dbUser => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect user_nick_name or user_password"
        });

      // it(`responds 400 'invalid user_nick_name or user_password' when bad user_password`, () => {
      //   const userInvalidPass = {
      //     user_nick_name: testUser.user_nick_name,
      //     user_password: "incorrect"
      //   };
      //   return supertest(app)
      //     .post("/api/auth/login")
      //     .send(userInvalidPass)
      //     .expect(400, { error: `Incorrect user_nick_name or user_password` });
      // });

      return AuthService.comparePasswords(
        loginUser.user_password,
        dbUser.user_password
      ).then(compareMatch => {
        if (!compareMatch)
          return res.status(400).json({
            error: "Incorrect user_nick_name or user_password"
          });

        const sub = dbUser.user_nick_name;
        const payload = { user_id: dbUser.id };
        const nickname = loginUser.user_nick_name
        console.log(nickname);
        res.send({
          authToken: AuthService.createJwt(sub, payload),
          is_admin: AuthService.getAdminInfo(req.app.get("db"), nickname)
          //this is where the logic described below goes
          // add logic to send whether or not they're an admin (this is
          // in the knex database)
        });
      });
    })
    .catch(next);
});

authRouter.post("/refresh", requireAuth, (req, res) => {
  const sub = req.user.user_nick_name;
  const payload = { user_id: req.user.user_id };
  res.send({
    authToken: AuthService.createJwt(sub, payload)
  });
});

module.exports = authRouter;
