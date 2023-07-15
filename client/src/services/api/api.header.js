const LOCATION = window.location;
const PROTOCOL = LOCATION.protocol;
const HOSTNAME = LOCATION.hostname;
const BASE_URL = PROTOCOL + '//' + HOSTNAME + ':3000' + '/api/';

export default {
    baseURL: BASE_URL,
    // withCredentials: true
};