import axios from 'axios';
import { apiURL } from 'react-native-dotenv';

// create axios instance
export default axios.create({
    baseURL: apiURL,
    headers: {'Content-Type': 'multipart/form-data'}
})