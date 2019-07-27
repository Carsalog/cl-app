import React from 'react';
import {shallow} from 'enzyme';

import Root from './Root';


describe('Root', () => {

  const PassedComponent = () => <div>child</div>;
  const root = shallow(Root(PassedComponent));

  it('should render properly', function () {
    expect(root).toMatchSnapshot();
  });

  it('should contains BrowserRouter component', function () {
    expect(root.find('BrowserRouter').exists()).toBe(true);
  });

  it('should contains Route', function () {
    expect(root.find('Route').exists()).toBe(true);
  });
});