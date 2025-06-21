const express = require('express');
const authrouter = express.Router();
const controllerauth=require('../controller/auth')


authrouter.get("/signup",controllerauth.getsignup)
authrouter.get("/login",controllerauth.getlogin)
authrouter.post("/login",controllerauth.postlogin)
authrouter.post("/logout",controllerauth.postlogout)
authrouter.post("/signup",controllerauth.postsignup)
exports.authrouter=authrouter