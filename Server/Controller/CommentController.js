import CommentModel from '../Model/commentModel.js';
import mongoose from 'mongoose';

// Create new Comment

export const createComment = async (req, res)=>{
    const newComment = new CommentModel(req.body);
    try {
        await newComment.save();
        res.status(200).json({message: "Comment created successfully"});
    
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// get a Comment
export const getComment = async (req, res)=>{
    const commentId = req.params.id;
    try {
        const comment = await CommentModel.findById(commentId).populate('userId');
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error.message);
    }
}
// get all Comment
export const getComments = async (req, res)=>{
    const postId = req.params.id;
    try {
        const comments = await CommentModel.find({postId: postId}).populate('userId');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// update Comment
export const updateComment = async (req, res)=>{
    const commentId = req.params.id;
    const {userId} = req.body
    try {
        const comment = await CommentModel.findById(commentId);
        if(comment.userId.toString() === userId){
            await comment.updateOne({$set: req.body});
            res.status(200).json({message: "Comment updated successfully"});
        }
        else{
            res.status(401).json({message: "You are not authorized to update this comment"});
        }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// delete Comment
export const deleteComment = async (req, res)=>{
    const commentId = req.params.id;
    const {userId} = req.body
    try {
        const comment = await CommentModel.findById(commentId);
        if(comment.userId === userId){
            await comment.deleteOne();
            res.status(200).json({message: "Comment deleted successfully"});
        }
        else{
            res.status(401).json({message: "You are not authorized to delete this comment"});
        }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}