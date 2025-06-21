const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getlogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render("auth/login");
};

exports.postlogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(422).render('auth/login', {
                errorMessages: ["Invalid email or password"],
                oldInput: { email }
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(422).render('auth/login', {
                errorMessages: ["Invalid email or password"],
                oldInput: { email }
            });
        }

        // Store data in session
        req.session.isLoggedIn = true;
        req.session.user = user; // Optional: if you want user data later

        // Ensure session is saved before redirect
        req.session.save(err => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).render('auth/login', {
                    errorMessages: ["Something went wrong. Please try again later."],
                    oldInput: { email }
                });
            }

            res.redirect('/');
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).render('auth/login', {
            errorMessages: ["Internal server error. Try again later."],
            oldInput: { email }
        });
    }
};

exports.postlogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
};

exports.getsignup = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render("auth/signup");
};

exports.postsignup = [
    // Validation middleware
    check('name')
        .notEmpty().withMessage('Full name is required')
        .trim()
        .isLength({ min: 10 }).withMessage('Full name must be at least 10 characters long')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Full name can only contain letters'),

    check('email')
        .isEmail().withMessage('Please enter a valid email')
        .normalizeEmail(),

    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password should contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password should contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password should contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password should contain at least one special character')
        .trim(),

    check('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),

    // Final controller function
    (req, res, next) => {
        const { name, email, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("auth/signup", {
                errorMessages: errors.array().map(err => err.msg),
                name,
                email,
                password
            });
        }

        bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({ name, email, password: hashedPassword });
            return user.save();
        }).then(() => {
            return res.redirect('/auth/login');
        }).catch(err => {
            console.log("Error saving user:", err);
            return res.render("auth/signup", {
                errorMessages: ['Something went wrong, please try again later.'],
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
        });
    }
];
