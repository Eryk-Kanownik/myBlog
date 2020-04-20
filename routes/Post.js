const express = require('express');
const router = express.Router()
const auth = require('../auth/auth');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs')

router.get('/get', async (req,res) => {
    const posts = await Post.find().sort({date:-1});
    res.json({posts})
})

router.post('/create',auth, async (req,res) => {
    var user = await User.findById(req.user);
    var {title,content} = req.body;
    console.log(title)
    if(!title || !content){
        return res.json({
            message:"Fill all of the fields"
        })
    }
    if(req.files){
        var {file} = req.files;
        file.name = Date.now() + file.name;
        fs.mkdir("../blog/client/public/files/posts/",(err) => console.log(err));
        file.mv('../blog/client/public/files/posts/'+file.name);
        var path = 'files/posts/'+file.name;
        const newPost = new Post({
            username:user.username,
            imagePath:path,
            title,
            content,
            userId:user._id
        })
        await newPost.save();
        return res.json({post:newPost,message:"Post has been created!"});
    } else {
        const newPost = new Post({
            username:user.username,
            title,
            content,
            userId:user._id
        })
        await newPost.save();
        return res.json({post:newPost,message:"Post has been created!"});
    }
})

router.put('/edit/:postId', auth ,async (req,res) => {
    var { postId } = req.params;
    var { newContent, newTitle } = req.body;
    var post = await Post.findById({_id:postId});
    console.log(newTitle.length)
    var content = newContent.length ? newContent : post.content;
    var title = newTitle.length ? newTitle : post.title;
    post.title = title;
    post.content = content;
    await post.save()
    post = await Post.findById({_id:postId});
    return res.json({
        message:"Post saved!",
        post
    })
})

router.delete('/delete/:postId',auth,async (req,res) => {
    await Post.findById({_id:req.params.postId}).remove()
    res.json({
        message:"Post deleted!"
    })
})

router.get('/singlepost', async (req,res) => {
    const post = await Post.findById({_id:req.query.post});
    post.view++
    await post.save();
    res.json(post);
})

router.post('/comment/:postId/add', auth, async(req,res) => {
    const {postId} = req.params;
    if(!req.body.comment){
        return res.json({message:"You have to write something to add comment"})
    }
    var post = await Post.findById({_id:postId})
    const user = await User.findById({_id:req.user})
    const comment = {
        userId:req.user,
        username:user.username,
        comment:req.body.comment
    }
    post.comments.unshift(comment)
    await post.save();
    post = await Post.findById({_id:postId})
    res.json({comments:post.comments, message:"Comment added!"})
})

router.delete('/comment/:postId/delete/:commentId', auth, async(req,res) => {
    var {postId,commentId} = req.params;
    const post = await Post.findById({_id:postId});
    const commentIndex = post.comments.map(elem => elem._id).indexOf(commentId);
    post.comments.splice(commentIndex,1)
    await post.save()
    return res.json({
        message:"Comment deleted!",
        comments:post.comments
    })
})

router.put("/comment/:postId/edit/:commentId", auth, async(req,res) => {
    var {postId,commentId} = req.params;
    var {newComment} = req.body
    const post = await Post.findById({_id:postId});
    const commentIndex = post.comments.map(elem => elem._id).indexOf(commentId);
    post.comments[commentIndex].comment = newComment
    await post.save()
    return res.json({
        message:"Comment edited!",
        comments:post.comments
    })
})

module.exports = router;