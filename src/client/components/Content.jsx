import React from 'react';
import AppModule from '../AppModule';

export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentState: null };
        this.logger = this.props.appModule.get('Logger');
    }

    componentDidMount() {
        this.subscriptions = [
            this.props.appModule.get('RoutingService').getStateStream().subscribe(newState => this.updateState(newState)),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    getView() {
        if (this.state.currentState) {
            return this.state.currentState.view;
        }
        return null;
    }

    updateState(newState) {
        try {
            this.setState({ currentState: newState });
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
