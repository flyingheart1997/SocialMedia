import * as AuthApi from '../../api/AuthRequest'

export const logIn = (formData) => async (dispatch) => {
    dispatch({type: 'LOGIN_REQUEST'})
    try {
        const {data} = await AuthApi.logIn(formData)
        dispatch({type: 'LOGIN_SUCCESS', data: data})
    } catch (error) {
        dispatch({type: 'LOGIN_FAILURE', error: error, data:error})
    }
  
}

export const signUp = (formData) => async (dispatch) => {
    dispatch({type: 'SIGIUP_REQUEST'})
    try {
        const {data} = await AuthApi.signUp(formData)
        dispatch({type: 'SIGIUP_SUCCESS', data: data})
    } catch (error) {
        dispatch({type: 'SIGIUP_FAILURE', error: error, data:error})
    }
  
}

export const logOut = () => async (dispatch) => {
    dispatch({type: 'LOG_OUT'})
  
}