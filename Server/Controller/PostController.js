import PostModel from '../Model/postModel.js';
import CommentModel from '../Model/commentModel.js';
import mongoose from 'mongoose';


// Create new Post

export const createPost = async (req, res)=>{
    const newPost = new PostModel(req.body);
    try {
        await newPost.save();
        res.status(200).json({message: "Post created successfully", posts: newPost});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// get a post
export const getPost = async (req, res)=>{
    const id = req.params.id;
    try {
        const post = await PostModel.find({_id:id}).populate('userId');
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
}
// get a user post
export const getUserPost = async (req, res)=>{
    const id = req.params.id;
    try {
        const post = await PostModel.find({userId:id}).populate('userId');
        res.status(200).json(post.sort((a, b)=>{
            return b.createdAt - a.createdAt;
        }));
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// get all posts
export const getAllPosts = async (req, res)=>{
    try {
        const posts = await PostModel.find().populate('userId');
        res.status(200).json(posts.sort((a, b)=>{
            return b.createdAt - a.createdAt;
        }));
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// update post
export const updatePost = async (req, res)=>{
    const postId = req.params.id;
    const {userId} = req.body
    try {
        const post = await PostModel.findById(postId);
        if(post.userId === userId){
            await post.updateOne({$set: req.body});
            res.status(200).json({message: "Post updated successfully"});
        }
        else{
            res.status(401).json({message: "You are not authorized to update this post"});
        }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// delete a post
export const deletePost = async (req, res)=>{
    const {id} = req.params;
    const {userId} = req.body
    try {
        const post = await PostModel.find({_id:id});
        if(post[0].userId?.toString() === userId){
            await post[0].deleteOne(post);
            res.status(200).json({message: "Post deleted successfully"});
        }
        else{
            res.status(401).json({message: "You are not authorized to delete this post"});
        }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// like/dislike a post
export const likePost = async (req, res)=>{
    const postId = req.params.id;
    const {userId} = req.body
    try {
        const post = await PostModel.findById(postId);
        if(!post.likes.includes(userId)){
            await post.updateOne({$push: {likes: userId}});
            res.status(200).json({message: "Post liked successfully"});
        }
        else{
            await post.updateOne({$pull: {likes: userId}});
            res.status(200).json({message: "Post dislike successfully"});
        }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// comment a post
export const createCommentsPost = async (req, res)=>{
    const postId = req.params.id;
    const {userId} = req.body
    try {
        const post = await PostModel.findById(postId).populate('userId');
        const newComment = new CommentModel({userId:userId, postId: postId, comment: req.body.comment});
        await newComment.save();
        await post?.updateOne({$push: {comments: {commentId: newComment._id, userId: userId, comment: req.body.comment}}});
        res.status(200).json({message: "Comment added successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}

// comment a post
export const getCommentsPost = async (req, res)=>{
    const postId = req.params.id;
    try {
        const comments = await CommentModel.find({postId: postId}).populate('userId');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error.message);
    }
    
}

// update comment post
export const updateCommentsPost = async (req, res)=>{
    const postId = req.params.id;
    const {userId} = req.body
    try {
        const post = await PostModel.findById(postId);
        const commentId = req.body.commentId;
        const comment = await CommentModel.findById(commentId);
        if(comment.userId.toString() === userId){
            await comment.updateOne({$set: {comment: req.body.comment}});
            await post?.updateOne({$set:{comments: req.body}});
            res.status(200).json({message: "Comment updated successfully"});
        }
        else{
            res.status(401).json({message: "You are not authorized to update this comment"});
        }
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}

// delete comment a post
export const deleteCommentsPost = async (req, res)=>{
    const postId = req.params.id;
    const commentId = req.params.commentId
    const userId = req.params.userId

    try {
        const post = await PostModel.findById(postId);
        const comment = await CommentModel.findById(commentId);
        if(comment.userId.toString() === userId){
            await comment.deleteOne(comment);
            await post.updateOne({$pull: {comments: {commentId: commentId}}});
            res.status(200).json({message: "Comment deleted successfully"});
        }
        else{
            res.status(401).json({message: "You are not authorized to delete this comment"});
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}


