import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import flash from "express-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import passport from "passport";
import passportLocal from "passport-local";
import User, { UserDocument } from "./models/user";
import ApiRoute from "./routes/api";
import AuthRoute from "./routes/auth";
import FridgeRoute from "./routes/fridge";
import RecipesRoute from "./routes/recipes";
import MongoStore from "connect-mongo";

declare global {
  namespace Express {
    interface User {
      id: mongoose.Types.ObjectId;
    }
  }
}

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error: Ensure that MongoDB is running. ${err}`
    );
  });

// Middleware -----------------------------------------------------------
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000, sameSite: "lax" },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  //console.log('req.session', req.session);
  return next();
});

app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err: NativeError, user: UserDocument) => {
    done(null, user as any);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email }, (err: NativeError, user: UserDocument) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Email not found." });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: "Invalid password." });
      });
    });
  })
);

// End Middleware --------------------------------------------------------

// API Endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", ApiRoute);
app.use("/auth", AuthRoute);
app.use("/fridge", FridgeRoute);
app.use("/recipes", RecipesRoute);

app.listen(process.env.PORT, () => {
  return console.log(`Server started on localhost:${process.env.PORT}`);
});
