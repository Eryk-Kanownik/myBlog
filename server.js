const express = require('express');
const dotenv = require('dotenv');
const database = require('./database');
const fileUpload = require('express-fileupload');
dotenv.config()
//express server
const app = express();
//database
database(process.env.MONGO_URI);
app.use(express.json());
app.use(fileUpload());

app.use('/user',require('./routes/User'));
app.use('/post',require('./routes/Post'));

app.listen(
    process.env.PORT,
    () => console.log(`Server.js = http://localhost:${process.env.PORT}`)
) 