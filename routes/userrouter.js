//core module
// const path=require('path')

//external module
const express=require('express');
const userrouter=express.Router();

// const rootdir=require("../utils/pathutil")

const controllerhome=require('../controller/home')
const controllerbookings=require('../controller/bookings')
const controllerdetail=require('../controller/home-detail')
const controllerfavourite=require('../controller/favourite')

userrouter.get("/",controllerhome.Home)
userrouter.get("/favourite",controllerfavourite.favourite)
userrouter.get("/bookings",controllerbookings.bookings)
userrouter.get("/home-detail/:id", controllerdetail.detail);
userrouter.get("/favourite-list", controllerfavourite.favourite);
userrouter.post('/favourite-list', controllerfavourite.addToFavourites);
userrouter.post('/delete-home/:id', controllerhome.homedelete);
userrouter.post('/edit-home/:id', controllerhome.postedithome);
userrouter.get('/edit-home/:id', controllerhome.getedithome);


module.exports= userrouter;