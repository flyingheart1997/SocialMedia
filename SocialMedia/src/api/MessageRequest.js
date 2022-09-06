import axios from "axios";

const API = axios.create({baseURL: 'https://swifts-chat-app.herokuapp.com'});

export const getMessages = (chatId) => API.get(`/message/all/${chatId}`)
export const createNewMessage = (data) => API.post('/message/',data)
export const deleteAllMessages = (chatId) => API.delete(`/message/all/${chatId}`)
export const delete_a_Message = (messageId) => API.delete(`/message/${messageId}`)