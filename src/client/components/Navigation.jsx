import React from 'react';

import NavigationItem from './NavigationItem';

export default class Navigation extends React.Component {
    render() {
        return (<div className="navigation">
            <NavigationItem href="#/" icon="home" label="Home" />
            <NavigationItem href="#/system/" icon="cogs" label="System" />
        </div>);
    }
}
