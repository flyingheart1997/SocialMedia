import axios from 'axios';

const API = axios.create({baseURL: 'https://swifts-chat-app.herokuapp.com'});

export const getTimeLinePost = ()=> API.get('/post/');
export const getUserPosts = (id)=> API.get(`/post/user/${id}`);
export const likePost = (id,userId)=> API.put(`/post/${id}/like`,{userId:userId})
export const deleteaPost = (id,userId)=> API.post(`/post/${id}/delete`,{userId:userId})