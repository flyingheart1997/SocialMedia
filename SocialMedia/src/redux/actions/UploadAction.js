import * as UploadApi from '../../api/UploadRequest'

export const uploadImage = (data)=> async(dispatch)=>{
    try {
        await UploadApi.uploadImage(data)
    } catch (error) {
        console.log(error); 
    }
}

export const uploadVideo = (data)=> async(dispatch)=>{
    try {
        await UploadApi.uploadVideo(data)
    } catch (error) {
        console.log(error);
    }
}

export const uploadPost = (data)=> async(dispatch)=>{
    dispatch({type: 'UPLOAD_REQUEST'})
    try {
        const newPost = await UploadApi.uploadPost(data)
        dispatch({type: 'UPLOAD_SUCCESS', data: newPost.data})
    } catch (error) {
        dispatch({type: 'UPLOAD_FAILURE', error: error, data:error})
    }
}

export const uploadComment = (data)=> async(dispatch)=>{
    dispatch({type: 'UPLOAD_COMMENT_REQUEST'})
    try {
        const newComment = await UploadApi.uploadComment(data)
        dispatch({type: 'UPLOAD_COMMENT_SUCCESS', data: newComment.data})
    } catch (error) {
        dispatch({type: 'UPLOAD_COMMENT_FAILURE', error: error, data:error})
    }
}