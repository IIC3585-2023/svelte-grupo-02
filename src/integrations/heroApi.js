import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

export default class heroApirequester {
    constructor() {
        this.url = "https://akabab.github.io/superhero-api/api";
        this.requester = axios.create({
            baseURL: this.url,
            timeout: 10000,
        });
        this.requester.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
    }
    
    async getHeroes() {
        try {
            const response = await this.requester.get("/all.json");
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getHero(id) {
        try {
            const response = await this.requester.get(`/id/${id}.json`);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}