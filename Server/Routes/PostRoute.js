import express from 'express'
import {updateCommentsPost,getCommentsPost,deleteCommentsPost,createCommentsPost, createPost, deletePost, getPost, likePost, updatePost, getAllPosts, getUserPost } from '../Controller/PostController.js'

const router = express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.get('/user/:id', getUserPost)
router.get('/', getAllPosts)
router.put('/:id', updatePost)
router.post('/:id/delete', deletePost)
router.put('/:id/like', likePost)
router.post('/:id/postComment', createCommentsPost)
router.get('/:id/getComment', getCommentsPost)
router.delete('/deleteComment/:id/:commentId/:userId', deleteCommentsPost)
router.post('/:id/updateComment', updateCommentsPost)

export default router