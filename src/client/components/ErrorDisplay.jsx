import React from 'react';
import AppModule from '../AppModule';
import classnames from './utils/classnames';

export default class ErrorDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.errorService = this.props.appModule.get('ErrorService');
        this.errorFormattingService = this.props.appModule.get('ErrorFormattingService');
        this.state = {
            error: null,
        };
    }

    componentDidMount() {
        this.subscriptions = [
            this.errorService.getErrorStream().subscribe(e => this.setError(e)),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    setError(e) {
        this.setState({ error: e });
    }

    hasError() {
        return !!this.state.error;
    }

    close() {
        this.errorService.clearErrors();
    }

    error() {
        if (!this.state.error) {
            return [];
        }
        return this.errorFormattingService.formatLines(this.state.error);
    }

    render() {
        return (<div className={classnames('error-display', { 'error-display--has-error': this.hasError() })}>
            <div className="error-display__modal">
                <div className="error-display__content">
                    {this.error().map(line => (<span key={line}>{line}<br /></span>))}
                </div>
                <div className="error-display__close"><button className="close-button">&times;</button></div>
            </div>
        </div>);
    }
}

ErrorDisplay.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
