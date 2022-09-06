const postReducer = (state ={posts: [], error:false, loading:false}, action) => {
    switch (action.type) {
        case 'UPLOAD_REQUEST':
            return {...state, loading: true, error: false}
        case 'UPLOAD_SUCCESS':
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return {...state, posts: [action.data,...state.posts], loading: false, error: false}
        case 'UPLOAD_FAILURE':
            return {...state, loading: false, error: true, posts: action.data}
        default:
            return state
    }
}

export default postReducer