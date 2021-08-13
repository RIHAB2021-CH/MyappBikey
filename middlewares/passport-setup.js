const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    // const {id} = jwt_payload
    const Owner = await owner.findById(jwt_payload.id);
    Owner ? done(null, Owner) : done(null, false);
  })
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
