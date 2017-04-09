export default class HttpService {
    constructor(superagent) {
        this.superagent = superagent;
    }

    get(url, query) {
        return this.superagent
            .get(url)
            .query(query)
            .then(res => res.body);
    }

    post(url, data) {
        return this.superagent.post(url).send(data).then(res => res.body);
    }

    put(url, data) {
        return this.superagent.put(url).send(data).then(res => res.body);
    }
}

HttpService.$name = 'HttpService';
HttpService.$inject = ['superagent'];
