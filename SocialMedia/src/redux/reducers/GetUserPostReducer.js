const getUserPostReducer = (state ={userPosts: null, error:false, loading:false,deleteLoading:false}, action) => {
    switch (action.type) {
        case 'GET_USER_POST_REQUEST':
            return {...state, loading: true, error: false}
        case 'GET_USER_POST_SUCCESS':
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return {...state, userPosts: action?.data, loading: false, error: false}
        case 'GET_USER_POST_FAILURE':
            return {...state, loading: false, error: true, userPosts: action.data}

        default:
            return state
    }
}

export default getUserPostReducer