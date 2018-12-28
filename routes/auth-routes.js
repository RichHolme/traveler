// //Creates an instance of a router and can attach routes to and use them in app.js
// const router = require("express").Router();
// const passport = require("passport");

// // Auth login
// // router.get("/login", (req, res) => {
// //   res.render("login", { user: req.user });
// // });

// // this route is just used to get the user basic info
// router.get("/user", (req, res, next) => {
//   console.log("===== user!!======");
//   console.log(req.body);
//   console.log(req.user);
//   if (req.user) {
//     return res.json({ user: req.user });
//   } else {
//     console.log("no user");
//     return res.json({ user: null });
//   }
// });

// //auth logout
// router.get("/logout", (req, res) => {
//   //handle with passport - passport handles logging out
//   req.logout();
//   res.redirect("/");
// });

// //auth with google
// //authenicate is a method and we're going to pass it a parameter google to use the google strategy
// //2nd parameter is the scope property --> what we want from the profile.
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile"]
//   })
// );

// //callback route for google to redirect to
// //passport.authentic will exchange the code and get the profile information --> then fires the callback function in passport-setup
// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//   //access the user on this req object
//   // res.send(req.user);
//   res.redirect("/Profile");
// });

// //attached all the routes to the instance of the router --> exports with all the handlers attached to it.
// module.exports = router;

var express = require("express");
var passport = require("passport");
var router = express.Router();

// // Auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// // this route is just used to get the user basic info
router.get("/user", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.body);
  console.log(req.user);
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    console.log("no user");
    return res.json({ user: null });
  }
});

// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });

// router.get("/login", function(req, res, next) {
//   res.render("login.ejs", { message: req.flash("loginMessage") });
// });

// router.get("/signup", function(req, res) {
//   res.render("signup.ejs", { message: req.flash("loginMessage") });
// });

// router.get("/profile", isLoggedIn, function(req, res) {
//   res.render("profile.ejs", { user: req.user });
// });

// router.get("/logout", function(req, res) {
//   req.logout();
//   res.redirect("/");
// });

// router.post(
//   "/signup",
//   passport.authenticate("local-signup", {
//     successRedirect: res.redirect("/Profile"),
//     failureRedirect: "/signup",
//     failureFlash: true
//   })
// );

// router.post(
//   "/login",
//   passport.authenticate("local-login", {
//     successRedirect: res.redirect("/Profile"),
//     failureRedirect: "/login",
//     failureFlash: true
//   })
// );

router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    //access the user on this req object
    // res.send(req.user);
    res.redirect("/Profile");
  }
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  (req, res) => {
    //access the user on this req object
    // res.send(req.user);
    res.redirect("/Profile");
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  //access the user on this req object
  // res.send(req.user);
  res.redirect("/Profile");
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/Profile");
}

/* LOGOUT ROUTER */
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
