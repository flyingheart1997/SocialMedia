import * as GetPostApi from '../../api/GetPostRequest'


export const getUserPosts = (id) => async (dispatch)=>{
    dispatch({type: 'GET_USER_POST_REQUEST'})
    try {
        const {data} = await GetPostApi.getUserPosts(id)
        dispatch({type: 'GET_USER_POST_SUCCESS', data: data})
    } catch (error) {
        dispatch({type: 'GET_USER_POST_FAILURE', error: error, data:error})
    }
}