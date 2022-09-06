import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, 'public/images');
        }
        else if(file.mimetype === 'video/mp4'){
            cb(null, 'public/videos');
        }
        else{
            cb(new Error('Invalid file type'), null);
        }
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
});
const upload = multer({storage: storage});
router.post('/', upload.any(), function(req, res) {
    try {
        return res.status(200).json({message: 'File uploaded successfully'})
    } catch (error) {
        return res.status(500).json({message: 'Error uploading file'})
    }
})


export default router