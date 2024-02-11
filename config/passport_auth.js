const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema");

let passportCallBack = async function (req, email, password, done) {
  try {
    const UserFound = await User.findOne({ email: email });
    if (!UserFound || UserFound.password != password) {
      req.flash('error', 'Please Enter Valid Email & Password');
      return done(null, false);
    }
    return done(null, UserFound);
  } catch (error) {
    return done(error);
  }
};

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    passportCallBack
  )
);
passport.serializeUser(function (user, done) {
  console.log(user.email);
  return done(null, user.email);
});

const deserializeUserCallBack = async function (email, done) {
  try {
    const UserLogin = await User.findOne({ email: email });
    return done(null, UserLogin);
  } catch (error) {
    return done(error);
  }
};

passport.deserializeUser(deserializeUserCallBack);

passport.checkAuthentication = function (req, res,next)
{
  if(req.isAuthenticated())
  {
    return next();
  }
  return res.redirect('/')
}

passport.setAuthenticateUser= function(req,res,next)
{
  if(req.isAuthenticated())
  {
    res.locals.user=req.user
  }
  next();
}

module.exports = passport;
