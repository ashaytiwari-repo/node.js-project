// const path = require('path');
// // const db = require("../utils/databaseutil")
// // const {getdb}=require("../utils/databaseutil")
// // const fs = require('fs');
// const rootdir = require('../utils/pathutil');
// const { ObjectId } = require('mongodb');

// // ✅ Path to the JSON file
// // const homedatapath = path.join(rootdir, 'data', 'homes.json');

// module.exports = class Home {
//     constructor(housename, price, location, rating, photo, _id) {
//         this.housename = housename;
//         this.location = location;
//         this.price = price;
//         this.rating = rating;
//         this.photo = photo;
//         this._id = _id; // ✅ Generate ID if not provided
//     }

//     // ✅ Save the home to the JSON file
//     save() {
//         const db=getdb()
//         return db.collection('homes').insertOne(this);
//         // return db.execute(`INSERT INTO homes(housename, price, location, rating, photo, id) VALUES ('${this.housename}','${this.price}','${this.location}','${this.rating}','${this.photo}','${this.id}')`)
//         // Home.find((registered) => {
//         //     registered.push(this); // Add current instance

//         //     fs.writeFile(
//         //         homedatapath,
//         //         JSON.stringify(registered, null, 2),
//         //         (error) => {
//         //             if (error) {
//         //                 console.log("❌ Failed to write file:", error);
//         //             } else {
//         //                 console.log("✅ Home saved to homes.json");
//         //             }
//         //         }
//         //     );
//         // });
//     }

//     // ✅ Fetch all homes from file (async with callback)
//     static find() {
//         const db=getdb()
//         return db.collection('homes').find().toArray()
//         // return db.execute("SELECT * from homes")
//         // fs.readFile(homedatapath, (err, data) => {
//         //     if (err) {
//         //         // File doesn't exist or can't be read
//         //         console.log("⚠️ homes.json not found or unreadable. Returning empty list.");
//         //         callback([]);
//         //     } else {
//         //         try {
//         //             const homes = JSON.parse(data.toString()); // parse file contents
//         //             callback(homes);
//         //         } catch (parseErr) {
//         //             console.log("❌ JSON parse failed. Returning empty list.");
//         //             callback([]);
//         //         }
//         //     }
//         // });
//     }
//     static findbyid(homeid){
//         const db=getdb()
//         return db.collection('homes').find({_id:new ObjectId(String(homeid))}).next()
//     }
//     static deletehome(homeid) {
//         // Home.find().then(([registered,field]) => {
//         //     const exists = registered.find(home => home._id == homeid); // ✅ loose equality

//         //     if (!exists) {
//         //         return callback(new Error('Home not found'), null);
//         //     }

//         //     const updated = registered.filter(home => home._id != homeid); // ✅ match delete condition

//         //     fs.writeFile(homedatapath, JSON.stringify(updated, null, 2), (err) => {
//         //         if (err) {
//         //             return callback(err, null);
//         //         }
//         //         callback(null, updated);
//         //     });
//         // });
//         const db=getdb()
//         return db.collection('homes').deleteOne({_id:new ObjectId(String(homeid))})
//     }

// }

// const { ObjectId } = require('mongodb');
const mongoose=require('mongoose')
const homeschemas=mongoose.Schema({
    housename: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    photo: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // make sure you have a User model
        required: true
    }
    


})
module.exports=mongoose.model('Home', homeschemas )