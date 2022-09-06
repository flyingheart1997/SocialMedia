import axios from 'axios';

const API = axios.create({baseURL: 'https://swifts-chat-app.herokuapp.com'});

export const getUserChat = (userId) => API.get(`/chat/${userId}`)
export const createNewChat = (data) => API.post('/chat/',data)
export const deleteChatFriend = (data) => API.delete(`/chat/delete/${data?.firstId}/${data?.secondId}`)
export const findFriendChat = (data) => API.get(`/chat/find/${data?.firstId}/${data?.secondId}`)