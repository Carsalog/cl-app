import React, {Component} from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Router from "./Router";
import Message from './components/common/Message';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav/>
        <Message/>
        <Router />
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;