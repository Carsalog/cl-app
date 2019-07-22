const conf = {
  base: "http://127.0.0.1:5000",
  api: "http://127.0.0.1:5000/api",
  urls: {
    posts: "/posts",
    users: "/users",
    auth: "/auth",
    transmissions: "/transmissions",
    states: "/states",
    cities: "/cities",
    makes: "/makes",
    models: "/models",
    cars: "/cars",
    zips: "/zips",
    tags: "/tags"
  },
  provider: {
    google: {
      apiKey: "AIzaSyB3a44LLyW_ihqKhzHO7hLHLHrtCkGjBfk",
      clientid: "656718471274-3lki79gcbh39nnkqn2oftd920eaqsr0m.apps.googleusercontent.com",
      cookiepolicy: "none",
      redirecturi: "postmessage",
      accesstype: "offline",
      approvalprompt: "force",
      scope: "openid email"
    },
    facebook: {
      appId: '325143368301060',
      status: true,
      autoLogAppEvents: true,
      cookie: true,
      xfbml: true,
      scope: 'publc_profile, email',
      version: 'v3.2'
    }
  },
  user: {
    menu: [
      {url: "/profile/me", name: "My info"},
      {url: "/profile/cars", name: "My cars"},
      {url: "/posts/new", name: "Sale a car"},
    ]
  },
  social: [
    {
      _id: "1",
      url: "#",
      class: "fa fa-twitter-square",
      color: "#1DA1F2",
      active: true
    },
    {
      _id: "2",
      url: "#",
      class: "fa fa-facebook-square",
      color: "#4267b2",
      active: true
    },
    {
      _id: "3",
      url: "#",
      class: "fa fa-youtube-play",
      color: "#ff0000",
      active: true
    }
  ],
  oauth: [
    {
      _id: "facebook",
      classes: "fa fa-facebook",
      text: "Sign In With Facebook",
      url: "/oauth/facebook",
      active: false
    },
    {
      _id: "google",
      classes: "fa fa-google-plus",
      text: "Sign In With Google",
      url: "/oauth/google",
      active: true
    },
    {
      _id: "twitter",
      classes: "fa fa-twitter",
      text: "Sign In With Twitter",
      url: "#",
      active: false
    },

  ],
  messages: {
    pwdRulesError: "Password should have at least 1: uppercase, lowercase, digit and special character",
    pwdMatchError: "Passwords don't match",
    zipMsg: "The information is correctly? If not Try different zip code.",
    descriptionRulesError: "Special characters don't allow",
    firstNameError: "First name cannot be empty",
    lastNameError: "Last name cannot be empty",
    emailError: "Email cannot be empty",
    phoneError: "Phone cannot be empty",
    emailTakenError: "This email registered already",
    loginError: "You are not logged in",
    permissionError: "You don't have permission to access"
  },
  pageSize: 9,
  currentPage: 1,
  make: null,
  model: null,
  state: null,
  city: null
};

export default (state = conf) => state;