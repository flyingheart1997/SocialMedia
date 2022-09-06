import axios from 'axios';

const API = axios.create({baseURL: 'https://swifts-chat-app.herokuapp.com'});

export const uploadImage = (data)=> API.post('/upload', data)
export const uploadVideo = (data)=> API.post('/upload', data)
export const uploadPost = (data)=> API.post('/post/', data)
export const uploadComment = (data)=> API.post(`/post/${data.postId}/postComment`, data)
export const getAllComments = (postId)=> API.get(`/comment/all/${postId}`)
export const deletePostComment = (deta)=> API.delete(`post/deleteComment/${deta.postId}/${deta.commentId}/${deta.userId}`)