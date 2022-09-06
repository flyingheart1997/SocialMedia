import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true,
    },
    desc: String,
    likes: [],
    image: String,
    video: String,
    date: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            commentId: {
                type: mongoose.Schema.Types.ObjectId, ref: "Comment",
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId, ref: "User",
            },
            comment: {type:String}
        }
    ]
},{timestamps: true})

const Post = mongoose.model("Post", postSchema)
export default Post;


