import axios from 'axios';
import apiHeader from '@/services/api/api.header';

class ApiService {
    getList(formData) {
        return axios.post('parser', formData, apiHeader);
    };
}

export default new ApiService();