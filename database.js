const mongoose = require('mongoose');

function database(uri){
    mongoose.connect(uri,{ 
            useNewUrlParser: true ,
            useUnifiedTopology: true
        })
        .then(() => console.log("MongoDB connected!"))
        .catch(err => console.log(`Something is wrong with database: ${err}`))
}
 
module.exports = database;