import { shallow } from 'enzyme';
import React from 'react';
import OptionSelector from '../../../../src/client/components/elements/OptionSelector';

fdescribe('OptionSelector', () => {
    it('should display options', (done) => {
        const selector = shallow(<OptionSelector searchText="" options={['a', 'b', 'c']} />);
        selector.instance()
            .componentDidMount()
            .then(() => {
                const li = selector.find('li');
                expect(li.length).toBe(3);
                expect(li.at(0).text()).toBe('a');
                expect(li.at(1).text()).toBe('b');
                expect(li.at(2).text()).toBe('c');
            })
            .catch(fail)
            .then(done);
    });

    it('should filter options', (done) => {
        const selector = shallow(<OptionSelector searchText="a" options={['aa', 'ba', 'cd']} />);
        selector.instance()
            .componentDidMount()
            .then(() => {
                const li = selector.find('li');
                expect(li.length).toBe(2);
                expect(li.at(0).text()).toBe('aa');
                expect(li.at(1).text()).toBe('ba');
            })
            .catch(fail)
            .then(done);
    });

    it('should update options when filter changes', (done) => {
        const options = ['aa', 'ba', 'cd'];
        const selector = shallow(<OptionSelector searchText="a" options={options} />);
        selector.instance()
            .componentDidMount()
            .then(() => selector.instance().componentWillReceiveProps({ options: options, searchText: 'd' }))
            .then(() => {
                const li = selector.find('li');
                expect(li.length).toBe(1);
                expect(li.at(0).text()).toBe('cd');
            })
            .catch(fail)
            .then(done);
    });

    it('should display no options', () => {
        const selector = shallow(<OptionSelector options={[]} />);
        const li = selector.find('li');
        expect(li.length).toBe(1);
        expect(li.text()).toBe('No Options Found');
    });

    it('should take a options provider', (done) => {
        const optionsProvider = jasmine.createSpy('optionsProvider');
        optionsProvider.and.returnValue(Promise.resolve(['a', 'b']));
        const selector = shallow(<OptionSelector searchText="a" options={optionsProvider} />);
        selector.instance()
            .componentDidMount()
            .then(() => {
                const li = selector.find('li');
                expect(li.length).toBe(2);
                expect(li.at(0).text()).toBe('a');
                expect(li.at(1).text()).toBe('b');
                expect(optionsProvider).toHaveBeenCalledWith('a');
            })
            .catch(fail)
            .then(done);
    });

    it('should allow selecting an option', (done) => {
        const onSelect = jasmine.createSpy('onSelect');
        const selector = shallow(<OptionSelector onSelect={onSelect} searchText="" options={['a', 'b', 'c']} />);
        selector.instance()
            .componentDidMount()
            .then(() => {
                const li = selector.find('li');
                li.at(1).find('a').prop('onClick')();
                expect(onSelect).toHaveBeenCalledWith('b');
            })
            .catch(fail)
            .then(done);
    });
});
