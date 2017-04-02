import rx from 'rx';

export default class ErrorService {
    constructor(logger) {
        this.errors = new rx.BehaviorSubject();
        this.logger = logger.getLogger(ErrorService);
    }

    getErrorStream() {
        return this.errors;
    }

    handleError(e) {
        this.logger.error(e);
        this.logger.error(e.stack);
        this.errors.onNext(e);
    }

    catchHandler() {
        return e => this.handleError(e);
    }

    clearErrors() {
        this.errors.onNext(null);
    }

    getError() {
        return this.errors.getValue();
    }
}

ErrorService.$name = 'ErrorService';
ErrorService.$inject = ['Logger'];
