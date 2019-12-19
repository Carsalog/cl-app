import React from 'react';
import {shallow} from 'enzyme';
import {Post, mapStateToProps, mapDispatchToProps} from './Post';

describe('Post', () => {

  const post = {
    _id: '123',
    year: '2000',
    make: 'testMake',
    model: 'testModel',
    mileage: '10000',
    description: 'some description',
    car: {
      year: '2000',
      make: 'testMake',
      model: 'testModel',
      fuel: 'gasoline',
      type: 'type',
      vin: 'vin123'
    },
    transmission: {
      _id: '685',
      name: 'tr_name'
    },
    tags: ['tag1', 'tag2'],
    images: []
  };

  const text = {
    table: {
      name: 'name',
      value: 'value',
      make: 'make',
      model: 'model',
      year: 'year',
      transmission: 'transmission',
      fuel: 'fuel',
      type: 'body type',
      mileage: 'mileage',
      vin: 'vin'
    }
  };

  const props = {
    history: {
      push: jest.fn()
    },
    params: {
      id: '123'
    },
    user: {},
    zip: {},
    base: '',
    myPosts: [post],
    posts: [post],
    post,
    text,
    makes: [],
    urls: {
      posts: '/posts'
    },
    path: {
      search: '/search'
    },
    make: {},
    state: {},
    city: {},
    model: {},
    onGetPost: jest.fn(),
    onSetPost: jest.fn()
  };
  const _post = shallow(<Post {...props}/>);

  it('should render properly', function () {
    expect(_post).toMatchSnapshot();
  });

  describe('if posts passed', () => {
    const _text = _post.text();

    it('should contains make', function () {
      expect(_text).toContain(post.make);
    });

    it('should contains model', function () {
      expect(_text).toContain(post.model);
    });

    it('should contains year', function () {
      expect(_text).toContain(post.year);
    });

    it('should contains mileage', function () {
      expect(_text).toContain(post.mileage);
    });

    it('should contains fuel', function () {
      expect(_text).toContain(post.car.fuel);
    });

    it('should contains transmission', function () {
      expect(_text).toContain(post.transmission.name);
    });

    it('should contains description', function () {
      expect(_text).toContain(post.description);
    });

    it('should contains vin', function () {
      expect(_text).toContain(post.car.vin);
    });

    it('should call onSetPost', function () {
      expect(props.onSetPost).toHaveBeenCalled();
    });
  });

  describe('if user click on the tag', () => {
    _post.instance().showByTag(post.tags[0]);

    it('should redirect user', function () {
      expect(props.history.push)
        .toBeCalledWith(`${props.path.search}?q=${post.tags[0]}`)
    });
  });

  describe('if component will unmount', () => {
    _post.instance().componentWillUnmount();

    it('should call onSetPost with null', function () {
      expect(props.onSetPost).toHaveBeenCalledWith(null)
    });
  });

  describe('if myPosts passed', () => {
    const newProps = {...props};
    newProps.posts = [];
    const wrapper = shallow(<Post {...newProps}/>);
    const _text = wrapper.text();

    it('should contains make', function () {
      expect(_text).toContain(post.make);
    });

    it('should contains model', function () {
      expect(_text).toContain(post.model);
    });

    it('should contains year', function () {
      expect(_text).toContain(post.year);
    });

    it('should contains mileage', function () {
      expect(_text).toContain(post.mileage);
    });

    it('should contains fuel', function () {
      expect(_text).toContain(post.car.fuel);
    });

    it('should contains transmission', function () {
      expect(_text).toContain(post.transmission.name);
    });

    it('should contains description', function () {
      expect(_text).toContain(post.description);
    });

    it('should contains vin', function () {
      expect(_text).toContain(post.car.vin);
    });

    it('should call onSetPost', function () {
      expect(newProps.onSetPost).toHaveBeenCalled();
    });
  });

  describe('if nor posts nor my posts were not pass', () => {
    const newProps = {...props};
    newProps.posts = [];
    newProps.myPosts = [];
    shallow(<Post {...newProps}/>);

    it('should call noGetPosts', function () {
      expect(newProps.onGetPost)
        .toHaveBeenCalledWith(`${newProps.urls.posts}/${newProps.params.id}`);
    });

  });

  describe('if post ia null', () => {
    const newProps = {...props};
    const comp = shallow(<Post {...newProps}/>);

    it('should set date as null', function () {
      expect(comp.instance().getDate(null)).toBe(null);
    });

    it('should set title as null', function () {
      expect(comp.instance().getTitle(null)).toBe(null);
    });
  });


  describe('test props', () => {

    const testProps = {...props};
    delete testProps.onGetPost;
    delete testProps.onSetPost;
    delete testProps.history;

    const state = {
      config: {
        pages: {
          post: {}
        },
        path: props.path,
        base: props.base
      },
      user: props.user,
      zip: props.zip,
      myPosts: props.myPosts,
      posts: props.posts,
      post,
      makes: props.makes,
      urls: props.urls,
      make: props.make,
      city: props.city,
      model: props.model
    };

    const ownProps = {
      match: {
        params: {
          id: '123'
        }
      }
    };

    it('should return correct props from given state', function () {

      const result = mapStateToProps(state, ownProps);

      Object.keys(testProps).forEach(key => {
        expect(result).toHaveProperty(key)
      });
    });

    it('should map dispatch to props', function () {

      const expected = {
        onGetPost: jest.fn(),
        onSetPost: jest.fn()
      };
      const dummyDispatch = obj => obj;
      const result = mapDispatchToProps(dummyDispatch);
      Object.keys(expected).forEach(key => {
        expect(result).toHaveProperty(key);
      })
    });
  });
});