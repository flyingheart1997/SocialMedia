import express from 'express';
import { deleteComment, getComments, getComment, createComment, updateComment } from '../Controller/CommentController.js';

const router = express.Router();

router.post('/:id', createComment)
router.get('/:id', getComment)
router.get('/all/:id', getComments)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

export default router;