import React from 'react';
import { shallow } from 'enzyme';
import app from '../helpers/app';
import ErrorDisplay from '../../../src/client/components/ErrorDisplay';

describe('ErrorDisplay', () => {
    it('should display and dismiss errors', () => {
        const appModule = app();
        const display = shallow(<ErrorDisplay appModule={appModule} />);
        display.instance().componentDidMount();

        expect(display.find('.error-display--has-error')).not.toBePresent();

        appModule.get('ErrorService').handleError(new Error('Some Error'));

        expect(display.find('.error-display--has-error')).toBePresent();
        expect(display.text()).toMatch(/Some Error/);

        display.find('.error-display__close-button').simulate('click');

        expect(appModule.get('ErrorService').getError()).toBeNull();
        expect(display.find('.error-display--has-error')).not.toBePresent();
    });
});
