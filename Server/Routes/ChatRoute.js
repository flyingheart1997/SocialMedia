import express from 'express'
import { createChat, deleteChat, findChat, userChats } from '../Controller/ChatController.js'

const router = express.Router()

router.post('/', createChat)
router.get('/:userId', userChats)
router.get('/find/:firstId/:secondId', findChat)
router.delete('/delete/:firstId/:secondId', deleteChat)

export default router