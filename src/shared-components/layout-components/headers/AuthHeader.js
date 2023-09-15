import React from 'react';
import Logo from '../../../assets/images/oneload-logo.jpg';

export const AuthHeader = () => {
  return (
    <header className="auth-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="https://oneloadpk.com" className="brand-logo">
          <img alt="" src={Logo} width="80px" />
        </a>
        <div className="collapse navbar-collapse" id="authNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="https://www.oneloadpk.com">
                Webiste
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.oneloadpk.com/faq">
                FAQs
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="https://www.oneloadpk.com/auth/HowToRegister">
                How to Register?
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-primary" id="sign-up1" href="#">
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
