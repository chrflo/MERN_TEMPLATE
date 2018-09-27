import { userConstants } from '../_constants/userConstants'
import { errorConstants } from '../_constants/errorConstants'
import setAuthToken from '../_utils/setAuthToken'
import jwt from 'jwt-decode';
import axios from 'axios';

export const registerUser = (user, history) => (dispatch) => {
    //let's register the user, but we have to wait for the data from the 
    //server, this is where dispatch comes in
    //*** proxy value was added to the pacakge JSON so we dont need to add the full route
    axios.post('api/users/register', user)
        .then(res => {
            history.push('/login')
        })
        .catch(err => {
            const { property, message } = err.response.data;
            const errors = {
                [property]: message
            };

            dispatch({
                type: errorConstants.GET_ERRORS,
                payload: errors
            });
        });
};

export const login = (user, history) => (dispatch) => {
    axios.post('/api/users/login', user)
        .then(res => {
            /*
             * Get the token from the result data and store the token
             */
            const { token } = res.data;

            //set the token in local storage (only takes strings)
            localStorage.setItem('token', token);

            //set the token to auth header to be a default axios header
            setAuthToken(token);

            //now that we set the token, we have to decode the user info in it using jwt
            const userDate = jwt(token);

            //now that we have it, let's set the current user
            dispatch(setCurrentUser(userDate));
        })
        .catch(err => {
            const { property, message } = err.response.data;
            const errors = {
                [property]: message
            };

            dispatch({
                type: errorConstants.GET_ERRORS,
                payload: errors
            });
        });
}

export const setCurrentUser = (userData) => {
    return {
        type: userConstants.SET_CURRENT_USER,
        payload: userData
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token'); //remove the expired token from local storage
    setAuthToken(false); // remove the authorization header
    dispatch(setCurrentUser({})); //set the current user to empty i.e.: no user
}