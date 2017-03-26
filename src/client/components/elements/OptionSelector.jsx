import React from 'react';

export default class OptionSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleOptions: [],
        };

        this.calculateOptions();
    }

    render() {
        return (<div className="option-selector">
            <ul className="option-selector__options">
                <li className="option-selector__option">

                </li>
            </ul>
        </div>);
    }
};

OptionSelector.propTypes = {
    options: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.func,
    ]).isRequired,
    searchText: React.PropTypes.string,
};

OptionSelector.defaultProps = {
    searchText: '',
};
