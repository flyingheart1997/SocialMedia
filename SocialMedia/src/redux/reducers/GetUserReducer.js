const getAUserReducer = (state ={user: null, error:false, loading:false}, action) => {
    switch (action.type) {
        case 'GET_A_USER_REQUEST':
            return {...state, loading: true, error: false}
        case 'GET_A_USER_SUCCESS':
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return {...state, user: action?.data, loading: false, error: false}
        case 'GET_A_USER_FAILURE':
            return {...state, loading: false, error: true, user: action.data}
        default:
            return state
    }
}

export default getAUserReducer