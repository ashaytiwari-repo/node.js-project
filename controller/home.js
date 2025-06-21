const Home = require('../models/home');
const { getdb } = require('../utils/databaseutil');
exports.Home = (req, res, next) => {
    console.log('GET Request - only user homes will be shown');

    const userId = req.session.user?._id;

    if (!userId) {
        return res.redirect('/login'); // Or show public homes if applicable
    }

    Home.find({ userId }) // 🔍 Filter homes for this user only
        .then((registered) => {
            console.log("User's homes:", registered);
            res.render('store/home', { registered, isLoggedIn: req.isLoggedIn });
        })
        .catch(err => {
            console.log("Error fetching homes:", err);
            res.status(500).send("Error loading homes");
        });
};


exports.homedelete = (req, res, next) => {
    const id = req.params.id;
    console.log("deleting the id:", id)
    Home.findByIdAndDelete(id).then((registered) => {
        res.redirect('/');
    })
}

exports.postedithome = (req, res, next) => {
    const { id, housename, price, location, rating,  } = req.body;
    
    Home.findById(id).then((home) => {
        home.housename = housename;
        home.price = price;
        home.location = location;
        home.rating = rating;
        if(req.file)
        {
            fs.unlink(home.photo,(err)=>{
                if(err){
                    console.log("error while deleting",err);
                }
                else{
                    home.photo=req.file.path

                }
            })
            
        }
        home.save().then((home) => {
            console.log("home edit succefully")
            res.redirect('/')
        }).catch((err) => {
            console.log("error while editing home", err)
        })


    })
}

exports.getedithome = (req, res, next) => {
    const id = req.params.id;
    Home.findById(id).then((home) => {
        res.render('admin/home-edit', { home })
    }).catch((err) => {
        console.log("error while finding home", err)
    })
}


