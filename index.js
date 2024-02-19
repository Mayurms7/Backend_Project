const express = require("express");
const port = 8000;
const path = require("path");
const db = require("./config/mongoose");
const useController = require("./controller/userController");
const flash=require('connect-flash')
const app = express();
const session = require("express-session");
const memoryStore = require('memorystore')(session)
const passport = require("passport");
const passportLocal = require("./config/passport_auth");
const customWare= require('./config/flashMsg');


app.set("Views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");

app.use(
  session({
    name: "placement_cell",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(customWare.setFlash);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
app.use('',require('./routes'))
app.listen(port);
