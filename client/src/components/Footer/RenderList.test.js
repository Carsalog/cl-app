import React from 'react';
import {shallow} from 'enzyme';
import {RenderList} from './RenderList';

describe('RenderList', () => {

  const props = {
    header: "test header",
    links: [{title: '1'}, {title: '2'}]
  };
  const renderList = shallow(<RenderList {...props}/>);

  it('should render properly', function () {
    expect(renderList).toMatchSnapshot();
  });

  it('should contains a name of the list', function () {
    expect(renderList.find('.footer__header').text()).toBe(props.header);
  });

  it('should contains RenderLink component', function () {
    expect(renderList.find('RenderLink').length).toBe(props.links.length);
  });
});