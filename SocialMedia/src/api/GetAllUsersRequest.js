import axios from 'axios';

const API = axios.create({baseURL: 'https://swifts-chat-app.herokuapp.com'});


export const getAllUsers = ()=> API.get('/user/')
export const get_a_User = (id)=> API.get(`/user/${id}`)
export const deleteUserAccountRequest = (id)=> API.delete(`/user/${id}`)
export const updateUser = (id, formData)=> API.put(`/user/${id}`,formData)
export const followUser = (id, data)=> API.put(`/user/${id}/follow`,data)
export const unFollowUser = (id, data)=> API.put(`/user/${id}/unfollow`,data)

