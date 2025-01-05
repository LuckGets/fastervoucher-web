import axios from 'axios';

const PORT: number = 8080;

console.log('port', PORT);

axios.defaults.baseURL = `http://localhost:${PORT}/api/v1/`;

export default axios;
