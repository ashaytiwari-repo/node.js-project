// const Favourite = require('../models/favourite'); // ✅ Capitalized for class
const Home=require('../models/home')
const User=require('../models/user')
const mongoose = require('mongoose');

exports.addToFavourites = async (req, res, next) => {
  try {
    console.log("Session User:", req.session.user); // Debugging
    const homeId = req.body.id;
    const userId = req.session.user?._id;
    const user = await User.findById(userId);
    
    if (!Array.isArray(user.favourites)) {
      user.favourites = [];
    }

    if (!user.favourites.includes(homeId)) {
      user.favourites.push(homeId);
      await user.save();
    }

    res.redirect('/favourite-list');
    
  } catch (error) {
    console.error("Error in addToFavourites:", error); // helpful log
    next(error);
  }
};



//   const fav = new Favourite({ id: homeid }); // ✅ correct way to create

//   fav.save()
//     .then((result) => {
//       console.log("✅ Favourite added:", result);
//       res.status(200).send("Added to favourites.");
//     })
//     .catch((err) => {
//       console.error("❌ Error adding to favourites:", err.message);

//       // Optional: Handle duplicate error (if user tries to favorite same item twice)
//       if (err.code === 11000) {
//         return res.status(409).send("Already in favourites.");
//       }

//       res.status(500).send("Failed to add to favourites.");
//     });
// };

// exports.favourite = (req, res, next) => {
//   Favourite.find()
//     .then((favourites) => {
//       const favouriteIds = favourites.map(fav => fav.id?.toString()).filter(Boolean);

//       const objectIds = favouriteIds.map(id => new mongoose.Types.ObjectId(id));

//       Home.find({ _id: { $in: objectIds } })
//         .then(favouriteHomes => {
//           console.log("✅ Favourite Homes from DB query:", favouriteHomes);
//           res.render('store/favourite-list', { favourites: favouriteHomes });
//         })
//         .catch(err => {
//           console.error("❌ Error fetching homes by IDs:", err.message);
//           res.status(500).send("Failed to load favourite homes.");
//         });
//     })
//     .catch(err => {
//       console.error("❌ Error fetching favourites:", err.message);
//       res.status(500).send("Failed to load favourites.");
//     });
// };
exports.favourite = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favourites');
    res.render('store/favourite-list', {
      favourites: user.favourites, // corrected spelling from 'favouritea' to 'favourites'
      isLoggedIn: req.isLoggedIn
    });
  } catch (error) {
    next(error);
  }
};
  // Favourite.find()
  // .populate("id") // ✅ because the reference field is named 'id'
  // .then((favourites) => {
  //   const favouriteHomes = favourites
  //     .map(f => f.id)
  //     .filter(home => home != null); // ✅ ensures no null data
  //   res.render("store/favourite-list", {
  //     favourites: favouriteHomes
  //   });
  // })
