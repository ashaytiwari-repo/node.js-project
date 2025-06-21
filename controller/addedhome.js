// const rootdir=require("../utils/pathutil")
// const path=require('path')
const Home=require('../models/home')
exports.addedhome = (req, res, next) => {
    console.log(req.body);
    const { housename, price, location, rating } = req.body;

    if (!req.file) {
        console.log("No image provided");
        return res.status(400).send("Image is required");
    }

    const photo = req.file.path;

    const newhome = new Home({
        housename,
        price,
        location,
        rating,
        photo,
        userId: req.session.user._id  // ✅ assuming user is stored in session
    });

    newhome.save()
        .then(() => {
            console.log("Home added successfully");
            res.render('admin/homeadded');
        })
        .catch((err) => {
            console.log("Error adding home:", err);
            res.status(500).send("Failed to add home");
        });
};
