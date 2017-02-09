import React from 'react';
import AppModule from '../../AppModule';
import SimplePage from '../elements/SimplePage';

export default class System extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<SimplePage title="System">A system page</SimplePage>);
    }
}

System.propTypes = {
    appModule: React.PropTypes.instanceOf(AppModule).isRequired,
};
