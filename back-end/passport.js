const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { Strategy: FacebookStrategy } = require("passport-facebook");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const account = profile._json;
      let user = {
        name: account.name,
        email: account.email,
        password: account.sub,
      };
      console.log("User :", user);
      done(null, user);
    }
  )
);
//Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      scope: ["profile", "email"],
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Profile :", profile);
      const account = profile;
      console.log("Account :", account);
      let user = {
        name: account.displayName,
        email: account.email,
        password: account.id,
      };
      console.log("User :", user);
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  // loads into req.session.passport.user
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // loads into req.user
  done(null, user);
});
