  import React from 'react';
import {Link} from 'react-router-dom';
import Social from './footer/Social';


const Footer = () => (
  <footer className="page-footer font-small bg-light pt-4 mt-4">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">Follow us</h5>
          <Social />
        </div>
        <hr className="clearfix w-100 d-md-none pb-3"/>
        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled decoration-none">
            <li>
              <Link to="#" className="link-gray">Link 1</Link>
            </li>
            <li>
              <Link to="#" className="link-gray">Link 2</Link>
            </li>
            <li>
              <Link to="#" className="link-gray">Link 3</Link>
            </li>
            <li>
              <Link to="#" className="link-gray">Link 4</Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled decoration-none">
            <li>
              <Link to="#" className="link-gray">Link 1</Link>
            </li>
            <li>
              <Link to="#" className="link-gray">Link 2</Link>
            </li>
            <li>
              <Link to="#" className="link-gray">Link 3</Link>
            </li>
            <li>
              <Link to="#" className="link-gray">Link 4</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright text-center py-3">
      <span className="text-muted">© 2018 Copyright: </span>
      <Link to="/" className="link-gray decoration-none">carsalog.com</Link>
    </div>
  </footer>
);

export default Footer;