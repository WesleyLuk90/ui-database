import React from 'react';
import classnames from '../utils/classnames';
import Button from './Button';

export default class VerticalScrollSelector extends React.Component {

    previousValue() {
        const index = this.props.options.indexOf(this.props.value);
        if (index < this.props.options.length - 1) {
            this.props.onChange(this.props.options[index + 1]);
        } else {
            this.props.onChange(this.props.options[0]);
        }
    }

    nextValue() {
        const index = this.props.options.indexOf(this.props.value);
        if (index < 1) {
            this.props.onChange(this.props.options[this.props.options.length - 1]);
        } else {
            this.props.onChange(this.props.options[index - 1]);
        }
    }

    render() {
        return (<div className="vertical-scroll-selector">
            <Button plain className="previous-value" onClick={() => this.previousValue()}><span className="fa fa-chevron-up" /></Button>
            <div className={classnames('vertical-scroll-selector__value', this.props.className)}>
                {this.props.value}
            </div>
            <Button plain className="next-value" onClick={() => this.nextValue()}><span className="fa fa-chevron-down" /></Button>
        </div>);
    }
}

VerticalScrollSelector.propTypes = {
    className: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
};

VerticalScrollSelector.defaultProps = {
    onChange: () => {},
};
