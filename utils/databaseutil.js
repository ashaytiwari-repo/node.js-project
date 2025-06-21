// const mysql =require('mysql2')
// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'ashay1207',
//     database:'airbnb',

// })

// module.exports=pool.promise()

// const mongo=require('mongodb')
// const MongoClient=mongo.MongoClient
// const url="mongodb+srv://root:root@ascluster0.cf4tyg3.mongodb.net/?retryWrites=true&w=majority&appName=ASCluster0"
// let _db
// const mongoconnect=(callback)=>{
//     MongoClient.connect(url).then(client=>{
//         console.log("Connected to MongoDB")
//         callback()
//          _db=client.db('airbnb')
//     }).catch(err=>{
//         console.log("Error connecting to MongoDB",err)
//     })
// }

// const getdb=()=>{
//     return _db;
// }
// exports.mongoconnect=mongoconnect;
// exports.getdb=getdb