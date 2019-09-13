import React from "react";
import {shallow} from "enzyme";
import {Router, mapStateToProps} from '../Router';


describe("Router", () => {

  const props = {
    path: {
      home: "/",
      location: "/buy",
      posts: "/posts",
      login: "/login",
      logout: "/logout",
      register: "/register",
      oauth: "/oauth",
      search: "/search",
      profile: "/profile",
      notFound: "/not-found"
    },
    notFound: {
      header: "404",
      placeholder: "Search",
      text: "The page you're looking for was not found",
      btnBack: "back",
      btnHome: "home page",
      home: "/"
    }
  };
  const router = shallow(<Router {...props}/>);

  it('should render properly', function () {
    expect(router).toMatchSnapshot();
  });

  it("checks that Router contains Switch", () => {
    expect(router.find('Switch').exists()).toBe(true);
  });

  it("checks that Router contains Routes", () => {
    expect(router.find('Route').length > 0).toBe(true);
  });

  it('should contains ProtectedRoute component', function () {
    expect(router.find('ProtectedRoute').exists()).toBe(true);
  });

  it('should render notFound component', function () {
    const selector = '#test-render-not-found';
    const render = router.find(selector).props().render();
    expect(render.props).toEqual(props.notFound);
  });

  describe('mapStateToProps', () => {

    const state = {
      config: {
        path: props.path,
        pages: { notFound: {} }
      }
    };

    const result = mapStateToProps(state);

    it('should contains path property', function () {
      expect(result).toHaveProperty('path', state.config.path);
    });

    it('should contains notFound property', function () {
      expect(result)
        .toHaveProperty('notFound', state.config.pages.notFound);
    });
  });
});