import React from 'react';
import classnames from '../utils/classnames';
import DomUtils from '../utils/DomUtils';
import OptionSelector from './OptionSelector';

export default class MultiDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            expanded: false,
            searchText: '',
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentDidUpdate() {
        if (this.shouldFocus) {
            this.shouldFocus = false;
            this.input.focus();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    expand() {
        this.shouldFocus = true;
        this.setState({ expanded: true });
    }

    setDropdown(e) {
        this.dropdown = e;
    }

    handleClick(event) {
        if (!this.state.expanded) {
            return;
        }
        if (event.target === this.dropdown || DomUtils.isAncestorOf(this.dropdown, event.target)) {
            return;
        }
        this.setState({ expanded: false });
    }

    onSearch(e) {
        this.setState({ searchText: e.target.value });
    }

    setInput(e) {
        this.input = e;
    }

    selectOption(o) {
        const newOptions = this.props.value.slice();
        newOptions.push(o);
        this.props.onChange(newOptions);
        this.setState({
            searchText: '',
            expanded: false,
        });
    }

    getAvailableOptions() {
        const options = this.props.options;
        return options.filter(o => this.props.value.indexOf(o) === -1);
    }

    getCurrentValues() {
        return this.props.value.map(v => <div key={v} className="multi-dropdown__selected">
            {v} <button className="multi-dropdown__remove" onClick={() => this.removeOption(v)}>&times;</button>
        </div>);
    }

    removeOption(o) {
        const newValue = this.props.value.filter(v => v !== o);
        this.props.onChange(newValue);
    }

    render() {
        return (<div ref={e => this.setDropdown(e)} className={classnames('multi-dropdown', { 'multi-dropdown--expanded': this.state.expanded })}>
            <a className="multi-dropdown__toggle" onClick={() => this.expand()}>{this.getCurrentValues()}</a>
            <div className="multi-dropdown__edit">
                <div className="multi-dropdown__input-container">
                    {this.getCurrentValues()}
                    <input type="text" ref={e => this.setInput(e)} className="multi-dropdown__input" value={this.state.searchText} onChange={e => this.onSearch(e)} />
                </div>
                <OptionSelector options={this.getAvailableOptions()} searchText={this.state.searchText} onSelect={o => this.selectOption(o)} />
            </div>
        </div>);
    }
}

MultiDropdown.propTypes = {
    options: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.func,
    ]).isRequired,
    value: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
};

MultiDropdown.defaultProps = {
    onChange: () => {},
};
