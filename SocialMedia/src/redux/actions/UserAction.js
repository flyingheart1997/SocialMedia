import * as UserApi from '../../api/GetAllUsersRequest.js'

export const updateUser = (id, formData) => async(dispatch)=>{
    dispatch({type: "UPDATE_USER_REQUEST"})
    try {
        const {data} = await UserApi.updateUser(id, formData)
        dispatch({type: "UPDATE_USER_SUCCESS", data:data})
    } catch (error) {
        dispatch({type: "UPDATE_USER_FAIL", error:error,data:error})
    }
}

export const followUser = (id, data) => async(dispatch)=>{
    dispatch({type: "FOLLOW_USER_REQUEST"})
    UserApi.followUser(id, data)
}
export const unFollowUser = (id, data) => async(dispatch)=>{
    dispatch({type: "UNFOLLOW_USER_REQUEST"})
    UserApi.unFollowUser(id, data)
}