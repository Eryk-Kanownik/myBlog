const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');
const Post = require('../models/Post')
router.post('/register',async (req,res) => {
    var {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.json({
            registered:false,
            message:"Fill all of the fields"
        })
    }
    var user = await User.findOne({email});
    if(user){
        return res.json({
            registered:false,
            message:"Email is already taken"
        })
    }
    var hashedPass = await bcrypt.hash(password,10)
    user = new User({
        username,
        password:hashedPass,
        email
    })
    await user.save()
    res.json({
        registered:true,
        message:"User succesfully registerd!"
    })
})

router.post('/login',async (req,res) => {
    var {email,password} = req.body;
    if(!email || !password){
        return res.json({
            message:"Fill all of the fields"
        })
    }
    var user = await User.findOne({email});
    if(!user){
        return res.json({
            message:"Invalid Credentials"
        })
    }
    var dehashedPass = await bcrypt.compare(password,user.password);
    if(!dehashedPass){
        return res.json({
            message:"Invalid Credentials"
        })
    }
    var payload = {
        id:user._id
    }
    const token = jwt.sign(payload,process.env.SECRET)
    res.json({token});
})

router.get('/get',auth, async (req,res) => {
    const user = await User.findById({_id:req.user}).select("-password")
    res.json(user)
})

router.get('/profile', async (req,res) => {
    const user = await User.findById({_id:req.query.userId}).select("-password");
    const posts = await Post.find({userId:user._id}).sort({date:-1})
    res.json({user,posts})
})

router.get('/allusers', async (req,res) => {
    const users = await User.find()
    const posts = await Post.find()
    var postsOfUsers = users.map(user => {
            return{
                user:user,
                userPosts:posts.filter(post => post.userId.toString() === user._id.toString())
            }
        })
    
    res.json(postsOfUsers)
})

module.exports = router;