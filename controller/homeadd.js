// const rootdir=require("../utils/pathutil")
// const path=require('path')
const Home=require('../models/home')
exports.addhome=(req, res, next) => {
    // res.send(`<p>add you home here</p>
    // <form action="/host/add-home" method="POST">
    //     <input type="text" name="housename" id="housename" placeholder='enter the name of your house'/>
    //     <input type="submit" />
    // </form>`
    // )
    // res.sendFile(path.join(rootdir, 'views', 'addhome.html'));
    res.render('admin/addhome')
   
};