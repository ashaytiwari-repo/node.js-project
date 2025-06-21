//core modules
const path = require('path')
//external modules
const express = require('express');
//local modules
const userrouter = require("./routes/userrouter")
const { hostrouter } = require("./routes/hostrouter")
const { authrouter } = require("./routes/authrouter")
const rootdir = require("./utils/pathutil");
const { mongoconnect } = require('./utils/databaseutil');
const { default: mongoose } = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session);
const dbpath = "mongodb+srv://root:root@ascluster0.cf4tyg3.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ASCluster0"
const multer = require('multer')




app = express();
app.set('view engine', 'ejs')
app.set('views', 'views')
//log the body
const store = new MongoStore({
    uri: dbpath,
    collection: 'sessions'
})

app.use((req, res, next) => {
    console.log(req.url, req.method);

    next();
})

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store

}))
app.use((req, res, next) => {
    // req.isLoggedIn=req.get('cookie')?.split('=')[1]||false;
    // console.log(req.isLoggedIn);
    req.isLoggedIn = req.session.isLoggedIn;
    next()

})
function randomStr(len) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ans = '';
    for (let i = 0; i < len; i++) {
        ans += chars[Math.floor(Math.random() * chars.length)];
    }
    return ans; // add this
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, randomStr(10) + '-' + file.originalname)
    }
})
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
const multeroptions = {
    storage,filefilter
}
//parse the body
app.use(express.urlencoded({ extended: true }));
app.use(multer(multeroptions).single('photo'))
//for tailwind css
app.use(express.static(path.join(rootdir, 'public')))
app.use('/uploads',express.static(path.join(rootdir, 'uploads')))
app.use('/auth', authrouter)
//router for the post means for get
app.use(userrouter)
// app.get("/",(req,res,next)=>{
//     console.log('Request URL:',req.url,req.method);
//     res.send(`<p>welcome to airbnb</p>
//         <a href='/host/add-home' >add-home </a>`);
// })


//router for the host means post
app.use('/host', (req, res, next) => {
    if (req.isLoggedIn) {
        next();
    }
    else {
        res.redirect('/auth/login')
    }

})
app.use('/host', hostrouter)
// app.get("/host/add-home",(req,res,next)=>{
//     res.send(`<p>add you home here</p>
//     <form action="/host/add-home" method="POST">
//         <input type="text" name="housename" id="housename" placeholder='enter the name of your house'/>
//         <input type="submit" />
//     </form>`

//     )
// })

// app.post('/host/add-home',(req,res,next)=>{
//     console.log(req.body)
//     res.send(`<p>home added sussesfully</p>
//         <a href='/'>go to home</a>`   
//     )

// })


app.use((req, res, next) => {
    // res.status(404).send("you page not found");
    res.sendFile(path.join(rootdir, 'views', '404.html'))
})


const port = 3000;
// mongoconnect(()=>{
//     app.listen(port,()=>{
//     console.log(`Server is running on port ${port}`);
// })
// })

mongoose.connect(dbpath).then(() => {
    console.log("connected to mongo")
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((err) => {
    console.log("error while connecting", err)
})