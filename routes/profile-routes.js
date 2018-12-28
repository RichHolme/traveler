const router = require("express").Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect("/auth/login");
  } else {
    //if logged in --> go to the next function which shows the profile
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  //send data to render to the profile view
  res.render("profile", { user: req.user });
});

module.exports = router;
