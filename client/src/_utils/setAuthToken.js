/*
 * Leverage axios' ability to set a default header
 */
import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;