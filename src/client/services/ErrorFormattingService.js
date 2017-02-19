import he from 'he';

export default class ErrorFormattingService {
    format(e) {
        return this.formatLines(e).join('\n');
    }

    formatLines(e) {
        const response = e.response;
        if (response) {
            const body = response.body;
            if (body) {
                const error = body.error;
                if (error && error.message) {
                    return [
                        `${response.statusText} (${response.statusCode})`,
                        `${error.name}: ${error.message}`,
                    ];
                }
            }
            const text = response.text;
            if (text) {
                return [`${response.statusText} (${response.statusCode})`].concat(he.decode(text).replace('<br>', '\n').split('\n'));
            }
        }
        return [e.toString()];
    }
}

ErrorFormattingService.$name = 'ErrorFormattingService';
