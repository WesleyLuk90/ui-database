import React from 'react';
import AppModule from '../../AppModule';

export default class System extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<div>This is system</div>);
    }
}

System.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
