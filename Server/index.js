import  {Server} from 'socket.io';
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import CommentRoute from './Routes/CommentRoute.js'
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'
import path from 'path';
import http from 'http'


const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// to serve images for public
const __dirname = path.resolve('..');
app.use(express.static('public'))

app.use(express.static(path.join(__dirname, 'public')));

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const io = new Server(httpServer, {
  cors: {
    origin: "https://swifts.netlify.app" || "http://localhost:3000",
  },
});

let activeUser = []



io.on('connection', (socket) => {
    // add new user
    socket.on('new-user-add', (newUserId)=>{
        if(!activeUser.some(user => user.userId === newUserId)){
            activeUser.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        io.emit('get-users', activeUser)
        console.log(activeUser);
    })
    // remove user
    socket.on('disconnect', ()=>{
        activeUser = activeUser.filter(user => user.socketId !== socket.id)
        io.emit('get-users', activeUser)
    })
})

httpServer.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/upload', UploadRoute)
app.use('/post', PostRoute)
app.use('/comment', CommentRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)