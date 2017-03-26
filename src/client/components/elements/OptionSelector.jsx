import React from 'react';
import Q from 'q';

export default class OptionSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleOptions: [],
        };
    }

    componentDidMount() {
        return this.calculateOptions(this.props)
            .then(options => this.setState({ visibleOptions: options }));
    }

    componentWillReceiveProps(newProps) {
        return this.calculateOptions(newProps)
            .then(options => this.setState({ visibleOptions: options }));
    }

    calculateOptions(props) {
        if (typeof props.options === 'function') {
            return Q.when(props.options(props.searchText));
        }
        return Q.when(props.options)
            .then(options => options.filter(o => o.toLowerCase().indexOf(props.searchText.toLowerCase()) > -1));
    }

    getVisibleOptions() {
        return this.state.visibleOptions;
    }

    render() {
        const visibleOptions = this.getVisibleOptions();
        return (<div className="option-selector">
            <ul className="option-selector__options">
                {visibleOptions.length > 0 ?
                    this.getVisibleOptions().map(o => <li key={o} className="option-selector__option">
                        <a href="#" onClick={e => this.selectOption(e, o)}>{o}</a>
                    </li>)
                    :
                    <li className="option-selector__no-options"><a>No Options Found</a></li>
                }
            </ul>
        </div>);
    }
}

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
