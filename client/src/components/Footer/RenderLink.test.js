import React from 'react';
import {shallow} from 'enzyme';
import {RenderLink} from './RenderLink';

describe('RenderLink', () => {

  const props = {
    title: "test title",
    url: "test url"
  };
  const renderLink = shallow(<RenderLink {...props}/>);

  it('should render properly', function () {
    expect(renderLink).toMatchSnapshot();
  });

  it('should contains url', function () {
    expect(renderLink.find('.footer__link').props()).toHaveProperty('to', props.url);
  });

  it('should contains title', function () {
    expect(renderLink.find('.footer__link')
      .props().children).toBe(props.title);
  });
});