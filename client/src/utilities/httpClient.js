import axios from 'axios';
import jwtDecode from 'jwt-decode';

const httpClient = axios.create();

httpClient.setToken = function(token) {
    localStorage.setItem('token', token);
    return token;
};

httpClient.getToken = function() {
    return localStorage.getItem('token');
};

httpClient.getCurrentUser = function() {
    const token = this.getToken();
    if (token) return jwtDecode(token);
    return null;
};

// autheticating tokens
httpClient.authenticate = async function(credentials, url) {
    try {
        let res = await this({ method: "post", url, data: credentials });
        const token = res.data.token;

        if (token) {
            this.defaults.headers.common.token = this.setToken(token);
            return jwtDecode(token);
        } else {
            return false;
        }
    } catch(err) {
        console.log(err);
    }
};

// logout
httpClient.logout = function() {
    localStorage.removeItem('token');
    delete this.defaults.headers.common.token;
    return true;
};


// when app opens try to set the localStorage token property as the default header
httpClient.defaults.headers.common.token = httpClient.getToken();

export default httpClient;