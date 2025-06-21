const Home = require('../models/home');

// Controller to render the details of a specific home
// exports.detail = (req, res, next) => {
//   const id = req.params.id;

//   // Home.find().then((homelist) => {
//   //   console.log("Fetched home list:", homelist);

//   //   const selectedHome = homelist.find(home => String(home._id) === String(id));

//   //   if (!selectedHome) {
//   //     return res.status(404).send("Home not found");
//   //   }

//   //   res.render('store/home-detail', { home: selectedHome });
//   // });
//   Home.findbyid(id)
//   .then(home =>
//     res.render('store/home-detail', { home: home })
//     )
// };
exports.detail = (req, res, next) => {
  const id = req.params.id;

  Home.findById(id)
    .then(home => {
      if (!home) {
        return res.status(404).send("Home not found");
      }

      res.render('store/home-detail', { home });
    })
    .catch(err => {
      console.error("Error finding home:", err);
      res.status(500).send("Internal server error");
    });
};
