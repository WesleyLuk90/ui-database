import rx from 'rx';

export default class ErrorService {
    constructor() {
        this.errors = new rx.BehaviorSubject();
    }

    getErrorStream() {
        return this.errors;
    }

    handleError(e) {
        console.log(e);
        console.log(e.stack);
        this.errors.onNext(e);
    }

    catchHandler() {
        return e => this.handleError(e);
    }

    clearErrors() {
        this.errors.onNext(null);
    }
}

ErrorService.$name = 'ErrorService';
