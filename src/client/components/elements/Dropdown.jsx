import React from 'react';
import classnames from '../utils/classnames';
import DomUtils from '../utils/DomUtils';
import OptionSelector from './OptionSelector';

export default class Dropdown extends React.Component {
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
        this.props.onChange(o);
        this.setState({
            searchText: '',
            expanded: false,
        });
    }

    render() {
        return (<div ref={e => this.setDropdown(e)} className={classnames('dropdown', { 'dropdown--expanded': this.state.expanded })}>
            <button className="dropdown__toggle" onClick={() => this.expand()}>
                {this.props.value ?
                    this.props.value :
                    <span className="dropdown__placeholder">{this.props.placeholder || 'Select a value...'}</span>}
            </button>
            <div className="dropdown__edit">
                <input type="text" ref={e => this.setInput(e)} className="dropdown__input" value={this.state.searchText} onChange={e => this.onSearch(e)} />
                <OptionSelector options={this.props.options} searchText={this.state.searchText} onSelect={o => this.selectOption(o)} />
            </div>
        </div>);
    }
}

Dropdown.propTypes = {
    options: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.func,
    ]).isRequired,
    value: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
};

Dropdown.defaultProps = {
    onChange: () => {},
    placeholder: null,
};
