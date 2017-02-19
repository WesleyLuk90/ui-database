export default class HttpService {
    constructor(superagent) {
        this.superagent = superagent;
    }

    post(url, data) {
        return this.superagent.post(url).send(data);
    }

    put(url, data) {
        return this.superagent.put(url).send(data);
    }
}

HttpService.$name = 'HttpService';
HttpService.$inject = ['superagent'];
