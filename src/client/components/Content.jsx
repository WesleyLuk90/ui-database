import React from 'react';
import AppModule from '../AppModule';

export default class Content extends React.Component {

    constructor(props) {
        super(props);

        this.routingService = this.props.appModule.get('RoutingService');
        this.logger = this.props.appModule.get('Logger');

        this.state = { view: null };
    }

    componentDidMount() {
        this.subscriptions = [
            this.routingService.getStateStream().subscribe(() => this.routingStateUpdated()),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    getView() {
        return this.state.view;
    }

    getCurrentView() {
        const params = this.routingService.getParams();
        if (params && params.view) {
            return params.view;
        }
        const state = this.routingService.getState();
        if (state) {
            if (state.view) {
                return state.view;
            }
            throw new Error(`No view associated with state ${state.name}`);
        }
        return null;
    }

    routingStateUpdated() {
        try {
            const currentView = this.getCurrentView();
            this.setState({ view: currentView });
        } catch (e) {
            this.logger.error(e);
        }
    }

    render() {
        return (<div className="content">{this.getView()}</div>);
    }
}

Content.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
