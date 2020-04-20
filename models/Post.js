const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    username:String,
    title:String,
    content:String,
    imagePath:{
        type:String,
        default:null
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    comments:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
            username:String,
            comment:String,
            date:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    view:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = Post = mongoose.model('posts',PostSchema);