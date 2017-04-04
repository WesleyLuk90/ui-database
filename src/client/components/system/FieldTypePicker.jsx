import React from 'react';
import Rx from 'rx';
import FieldType from '../../models/FieldType';
import Icon from '../elements/Icon';
import classnames from '../utils/classnames';
import DomUtils from '../utils/DomUtils';

export default class FieldTypePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    componentDidMount() {
        this.subscriptions = [
            Rx.Observable.fromEvent(document, 'click').subscribe(e => this.handleDocumentClick(e)),
        ];
    }

    componentWillUnmount() {
        this.subscriptions.forEach(s => s.dispose());
    }

    handleDocumentClick(e) {
        if (!this.state.expanded) {
            return;
        }
        if (DomUtils.isAncestorOf(this.ele, e.target)) {
            return;
        }
        e.preventDefault();
        this.setState({ expanded: false });
    }

    setElement(ele) {
        this.ele = ele;
    }

    selectField(e, field) {
        if (e) {
            e.preventDefault();
        }
        this.setState({ expanded: false });
        this.props.onSelect(field);
    }

    toggleExpanded(e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        return (<div ref={e => this.setElement(e)} className={classnames('field-type-picker', { 'field-type-picker--expanded': this.state.expanded })}>
            <button className="field-type-picker__toggle" onClick={e => this.toggleExpanded(e)}>Add Field</button>
            <ul className="field-type-picker__options">
                {FieldType.getTypes().map(f =>
                    <li key={f.getType()}>
                        <a href="#" onClick={e => this.selectField(e, f)}><Icon icon={f.getIcon()} /> {f.getLabel()}</a>
                    </li>)}
            </ul>
        </div>);
    }
}

FieldTypePicker.propTypes = {
    onSelect: React.PropTypes.func.isRequired,
};
