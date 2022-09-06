import mongoose from "mongoose";
import MessageModel from "../Model/messageModel.js";

export const addMessage = async (req, res) => {
    const { chatId, senderId, text, image, video } = req.body;
    const message = new MessageModel({
        chatId,
        senderId,
        text,
        image,
        video
    });
    try {
        const result = await message.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await MessageModel.find({ chatId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        await MessageModel.deleteMany({ chatId });
        res.status(200).json({ message: "Messages deleted successfully" });
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getSingleMessage = async(req, res)=>{
    const { messageId } = req.params;
    try{
        const message = await MessageModel.findById(messageId);
        res.status(200).json(message);
    } catch(error){
        res.status(500).json(error);
    }
}

export const deleteSingleMessage = async(req, res)=>{
    const { messageId } = req.params;
    try{
        await MessageModel.findByIdAndDelete(messageId);
        res.status(200).json({message:"Message deleted successfully"});
    } catch(error){
        res.status(500).json(error);
    }
}