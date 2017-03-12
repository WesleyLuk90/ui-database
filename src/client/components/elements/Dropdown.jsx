import React from 'react';
import classnames from '../utils/classnames';
import DomUtils from '../utils/DomUtils';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            expanded: false,
            filter: '',
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    expand() {
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

    getOptions() {
        if (typeof this.props.options === 'function') {
            return this.props.options(this.state.filter);
        }
        return this.props.options;
    }

    render() {
        return (<div ref={e => this.setDropdown(e)} className={classnames('dropdown', { 'dropdown--expanded': this.state.expanded })}>
            <button className="dropdown__toggle" onClick={() => this.expand()}>Stuff</button>
            <div className="dropdown__edit">
                <input type="text" className="dropdown__input" value="Stuff" />
                <ul className="dropdown__options">
                    {this.getOptions().map(o => <li key={o}><a className="dropdown__option">{o}</a></li>)}
                </ul>
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
    onChange: React.PropTypes.func,
};

Dropdown.defaultProps = {
    onChange: () => {},
};
