import createApiClient from './api.service';

class UserService {
    constructor(baseUrl = '/api/auth'){
        this.api = createApiClient(baseUrl);
    }

    async login(data){
        return (await this.api.post('/login', data)).data;
    } 

    async create(data) {
        return (await this.api.post('/register', data)).data;
    }

    async getAll() {
        return (await this.api.get('/')).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
}

export default new UserService();