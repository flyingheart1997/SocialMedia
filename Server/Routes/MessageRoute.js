import express from 'express'
import { addMessage, deleteMessages, deleteSingleMessage, getMessages, getSingleMessage } from '../Controller/MessageController.js'

const router = express.Router()

router.post('/', addMessage)
router.get('/:messageId', getSingleMessage)
router.delete('/:messageId', deleteSingleMessage)
router.get('/all/:chatId', getMessages)
router.delete('/all/:chatId', deleteMessages)


export default router