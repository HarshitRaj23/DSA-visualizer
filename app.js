// jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

// Setting up Express middleware
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up session and passport
app.use(session({
    secret: "our little secret.", // Be sure to use a strong secret string
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Admin-Neural-Brainiacs:Test12345@cluster0.8moz4.mongodb.net/userDBDSA");


// Define schema and model for User and Visitor
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});

const Visitor = mongoose.model("Visitor", visitorSchema);

// Passport configuration
passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Routes
app.get("/", async (req, res) => {
    try {
        const visitor = await Visitor.findOne({});
        if (!visitor) {
            // If no visitor count exists, create a new one
            const newVisitor = new Visitor({ count: 1 });
            await newVisitor.save();
            res.render("index", { visitorCount: 1 });
        } else {
            // Increment visitor count and update in the database
            visitor.count += 1;
            await visitor.save();
            res.render("index", { visitorCount: visitor.count });
        }
    } catch (err) {
        console.log(err);
        res.render("index", { visitorCount: 0 }); // Render with 0 if there's an error
    }
});

app.get("/welcome", (req, res) => {
    res.render("welcome");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/home", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home");
    } else {
        res.redirect("/login");
    }
});

app.get("/about", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("about");
    } else {
        res.redirect("/login");
    }
});

app.get("/teams", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("teams");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
});

app.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/home");
            });
        }
    });
});

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err) {
            console.log(err);
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/home");
            });
        }
    });
});

// Visualization route
app.get("/visualize", (req, res) => {
    res.render("visual");
});

// Server setup
app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000.");
});
