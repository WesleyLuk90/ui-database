import React from 'react';
import Q from 'q';
import classnames from '../utils/classnames';

export default class OptionSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleOptions: [],
            options: this.props.options,
            searchText: this.props.searchText,
            selectedIndex: 0,
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown, true);
        return this.calculateOptions(this.props)
            .then(options => this.setState({ visibleOptions: options }));
    }

    componentWillReceiveProps(newProps) {
        return this.calculateOptions(newProps)
            .then(options => this.setState({ visibleOptions: options }));
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    selectedIndexWithOffset(offset) {
        let position = this.state.selectedIndex + offset;
        if (position < 0) {
            position = -1;
        }
        if (position >= this.getVisibleOptions().length) {
            position = this.getVisibleOptions().length - 1;
        }
        return position;
    }

    handleKeyDown(event) {
        if (event.key === 'ArrowDown') {
            this.setState({ selectedIndex: this.selectedIndexWithOffset(1) });
        }
        if (event.key === 'ArrowUp') {
            this.setState({ selectedIndex: this.selectedIndexWithOffset(-1) });
        }
        if (event.key === 'Enter' && this.getVisibleOptions()[this.state.selectedIndex] != null) {
            this.props.onSelect(this.getVisibleOptions()[this.state.selectedIndex]);
        }
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

    selectOption(e, o) {
        if (e) {
            e.preventDefault();
        }
        this.props.onSelect(o);
    }

    getListOptions(options) {
        if (options.length === 0) {
            return <li className="option-selector__no-options"><a>No Options Found</a></li>;
        }
        return this.getVisibleOptions().map((o, index) => <li key={o} className={this.getOptionClass(index)}>
            <a href="#" onClick={e => this.selectOption(e, o)}>{o}</a>
        </li>);
    }

    getOptionClass(index) {
        return classnames('option-selector__option', { 'option-selector__option--active': index === this.state.selectedIndex });
    }

    render() {
        const visibleOptions = this.getVisibleOptions();
        return (<div className="option-selector">
            <ul className="option-selector__options">
                {this.getListOptions(visibleOptions)}
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
    onSelect: React.PropTypes.func,
};

OptionSelector.defaultProps = {
    searchText: '',
    onSelect: () => {},
};
