const keys = require("./keys");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var User = require("../models/User");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        process.nextTick(function() {
          User.findOne({ "local.email": email }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              var newUser = new User();
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);
              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        User.findOne({ "local.email": email }, function(err, user) {
          if (err) return done(err);
          if (!user)
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found.")
            );
          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            );
          return done(null, user);
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.facebookAuth.clientID,
        clientSecret: keys.facebookAuth.clientSecret,
        callbackURL: keys.facebookAuth.callbackURL,
        profileFields: ["id", "email", "first_name", "last_name", "photos"]
      },
      function(token, refreshToken, profile, done) {
        process.nextTick(function() {
          User.findOne({ "facebook.id": profile.id }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(null, user);
            } else {
              var newUser = new User();
              newUser.facebook.id = profile.id;
              newUser.facebook.token = token;
              newUser.name =
                profile.name.givenName + " " + profile.name.familyName;
              newUser.email = (profile.emails[0].value || "").toLowerCase();
              newUser.thumbnail = profile.photos[0].value;
              // newUser.thumbnail = profile.photos[0];
              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: keys.twitterAuth.consumerKey,
        consumerSecret: keys.twitterAuth.consumerSecret,
        callbackURL: keys.twitterAuth.callbackURL
      },
      function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
          User.findOne({ "twitter.id": profile.id }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(null, user);
            } else {
              var newUser = new User();
              newUser.twitter.id = profile.id;
              newUser.twitter.token = token;
              newUser.twitter.username = profile.username;
              newUser.name = profile.displayName;
              newUser.twitter.email = profile.email;
              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleAuth.clientID,
        clientSecret: keys.googleAuth.clientSecret,
        callbackURL: keys.googleAuth.callbackURL
      },
      function(token, refreshToken, profile, done) {
        process.nextTick(function() {
          User.findOne({ "google.id": profile.id }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(null, user);
            } else {
              var newUser = new User();
              newUser.google.id = profile.id;
              newUser.google.token = token;
              newUser.name = profile.displayName;
              newUser.email = profile.emails[0].value;
              newUser.thumbnail = profile._json.image.url;
              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
};
