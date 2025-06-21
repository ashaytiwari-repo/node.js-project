// const path = require('path');

const express = require('express');
const hostrouter = express.Router();

// const rootdir = require("../utils/pathutil");

const homeadd=require('../controller/homeadd')
const addedhome=require('../controller/addedhome')

hostrouter.get("/add-home",homeadd.addhome)
hostrouter.post('/add-home',addedhome.addedhome)

exports.hostrouter = hostrouter;

