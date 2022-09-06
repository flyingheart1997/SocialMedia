const authReducer = (state = {authData: null,signUpData: null, loading: false, logInData: null, error: false, updateLoading: false }, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, loading: true, error: false }
        case 'LOGIN_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, loading: false, error: false, }
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: true, logInData: action.data }


        case 'SIGIUP_REQUEST':
            return { ...state, loading: true, error: false }
        case 'SIGIUP_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, loading: false, error: false, }
        case 'SIGIUP_FAILURE':
            return { ...state, loading: false, error: true, signUpData: action.data }


        case 'UPDATE_USER_REQUEST':
            return { ...state, updateLoading: true, error: false }
        case 'UPDATE_USER_SUCCESS':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action.data, updateLoading: false, error: false, }
        case 'UPDATE_USER_FAIL':
            return { ...state, authData: action.data, updateLoading: false, error: true }

        case 'FOLLOW_USER_REQUEST':
            return {...state, authData:{...state.authData, user:{...state.authData.user, following: [...state.authData.user.following, action.data]}}}

        case 'UNFOLLOW_USER_REQUEST':
            return {...state, authData:{...state.authData, user:{...state.authData.user, following: [...state.authData.user.following.filter(id=>id!==action.data)]}}}

        case 'LOG_OUT':
            localStorage.clear()
            return { ...state, authData: null, loading: false, error: false }
        default:
            return state
    }
}

export default authReducer