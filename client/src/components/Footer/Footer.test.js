import React from "react";
import {shallow} from "enzyme";
import {Footer, mapStateToProps} from './index';


describe("Footer", () => {

  const props = {
    follow: {header: "test follow header"},
    resources: {},
    about: {},
    copyright: {
      text: "test copyright text",
      link: {
        title: "test copyright link title",
        url: "test copyright link url"
      }
    }
  };
  const footer = shallow(<Footer {...props}/>);

  it('should render properly', function () {
    expect(footer).toMatchSnapshot();
  });

  it('should contains follow us header', function () {
    expect(footer.find('.footer__icons-header').text())
      .toBe(props.follow.header);
  });

  it("checks that Footer contains Social component", () => {
    expect(footer.find('Connect(Social)').length).toBe(1);
  });

  it('should contains RenderList component', function () {
    expect(footer.find('RenderList').length).toBe(2);
  });

  it('should contains copyright text', function () {
    expect(footer.find('.footer__copyright-text').text())
      .toBe(props.copyright.text);
  });

  it('should contains text of copyright link', function () {
    expect(footer.find('Link').props())
      .toHaveProperty('children', props.copyright.link.title);
  });

  it('should contains url of copyright link', function () {
    expect(footer.find('Link').props())
      .toHaveProperty('to', props.copyright.link.url);
  });

  describe('mapStateToProps', () => {
    const state = {
      config: {
        footer: props
      }
    };
    const result = mapStateToProps(state);

    it('should contains follow property', function () {
      expect(result).toHaveProperty('follow', props.follow);
    });

    it('should contains about property', function () {
      expect(result).toHaveProperty('about', props.about);
    });

    it('should contains resources property', function () {
      expect(result).toHaveProperty('resources', props.resources);
    });

    it('should contains copyright property', function () {
      expect(result).toHaveProperty('copyright', props.copyright);
    });
  });
});