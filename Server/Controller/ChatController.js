import ChatModel from "../Model/chatModel.js";

export const createChat = async(req, res)=>{
    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId]

    })
    try {
        const isMatch = await ChatModel.find({members: {$all: [req.body.senderId, req.body.receiverId]}})
        if(isMatch.length > 0){
            res.status(200).json({message: "Chat already exists"})
        }else{
            const savedChat = await newChat.save()
            res.status(200).json(savedChat)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}



export const userChats = async(req, res)=>{
    try {
        const chat = await ChatModel.find({
            members: {$in: [req.params.userId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}



export const findChat = async(req, res)=>{
    try {
        const chat = await ChatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteChat = async(req, res)=>{
    try {
        const chat = await ChatModel.findOneAndDelete({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}