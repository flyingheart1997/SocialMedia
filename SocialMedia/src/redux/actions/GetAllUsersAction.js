import * as GetAllUsersApi from '../../api/GetAllUsersRequest.js'

export const get_a_User = (id) => async (dispatch)=>{
    dispatch({type: 'GET_A_USER_REQUEST'})
    try {
        const {data} = await GetAllUsersApi.get_a_User(id)
        dispatch({type: 'GET_A_USER_SUCCESS', data: data})
    } catch (error) {
        dispatch({type: 'GET_A_USER_FAILURE', error: error, data:error})
    }
}