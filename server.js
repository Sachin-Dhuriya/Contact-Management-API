//------------------------------------------Requiring Express-------------------------
const express = require('express');
const app = express();
//------------------------------------------DOT-ENV-----------------------------------
require('dotenv').config();
//------------------------------------------Mongo-Connectivity------------------------
let mongoConnection = require('./config/mongo')
mongoConnection.then(() => { console.log(`Database Connected Successfully.....`); }).catch((error => { console.log(`Problem in connecting the DataBase......`); }))

//------------------------------------------Middlewares--------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//------------------------------------------API Routes---------------------------------
const contactRoutes = require("./routes/contactRoutes")
app.use(`/api/contacts`, contactRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is listenning on port${process.env.PORT}.......`);
})