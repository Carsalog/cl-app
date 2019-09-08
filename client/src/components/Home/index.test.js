import React from 'react';
import {shallow} from 'enzyme';
import {Home, mapStateToProps} from './index';

describe('Home', () => {

  const props = {
    greeting: "Greeting message",
    buyText: "buy message",
    sellText: "sell message",
    car: {},
    moneyBag: {}
  };
  const home = shallow(<Home {...props}/>);

  it('should render properly', function () {
    expect(home.text()).toMatchSnapshot();
  });

  it('should contains greeting', function () {
    expect(home.text()).toContain(props.greeting);
  });

  it('should contains buy message', function () {
    const text = home.find('#buy').childAt(0).text();
    expect(text).toBe(props.buyText);
  });

  it('should contains sell message', function () {
    const text = home.find('#sell').childAt(0).text();
    expect(text).toBe(props.sellText);
  });

  describe('mapStateToProps', () => {

    const state = {
      config: {
        icons: {
          moneyBag: "test moneyBag",
          car: "test car"
        },
        pages: {
          home: {
            greeting: "test greeting",
            buyText: "test buyText",
            sellText: "sell sellText"
          }
        }
      }
    };
    const result = mapStateToProps(state);

    it('should contains car icon', function () {
      expect(result)
        .toHaveProperty('car', state.config.icons.car);
    });

    it('should contains moneyBag icon', function () {
      expect(result)
        .toHaveProperty('moneyBag', state.config.icons.moneyBag);
    });

    it('should contains greeting text', function () {
      expect(result).toHaveProperty(
        'greeting',
        state.config.pages.home.greeting);
    });

    it('should contains buyText', function () {
      expect(result).toHaveProperty(
        'buyText',
        state.config.pages.home.buyText);
    });

    it('should contains sellText', function () {
      expect(result).toHaveProperty(
        'sellText',
        state.config.pages.home.sellText);
    });
  });
});