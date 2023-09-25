const { use } = require("passport");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080",
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {

            req.user_name = profile._json.name;
            req.user_email = profile._json.email;

            return done(null, profile);
        }
    )
);