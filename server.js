const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportSetup = require("./config/passport-setup");
const app = express();
const keys = require("./config/keys");
const database = require("./config/database");
const cookieSession = require("cookie-session");
const passport = require("passport");
const PORT = process.env.PORT || 3001;
const db = require("./models");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const routes = require("./routes");
const session = require("express-session");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(
  cookieSession({
    //maxage is the age of the cookie
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

//initialize passport
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

//set up view engine
app.set("view engine", "ejs");
//encrypts cookie

//connect to mongodb --> pass connection string and then a second parameter to console log message
mongoose.connect(
  database.mongodb.dbURI,
  () => {
    console.log("connected to mongoDB");
  }
);

require("./config/passport-setup")(passport);

//create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app // Start the API server
  .listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
