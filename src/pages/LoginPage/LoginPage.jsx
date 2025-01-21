import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../../components/LoginForm/LoginForm';
import Header from '../../components/Header/Header';
import './LoginPage.scss'
import { Link } from 'react-router-dom';


const LoginPage = ({formData, setFormData}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to extract authorization code from URL query parameters
    const getAuthorizationCode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

    };

    getAuthorizationCode();
  }, []);

  return (
    <div>
        <>
          <Header isLoggedIn={false}/>
          <section className='login'>
            <h1 className='login__title'>Login</h1>
            <LoginForm formData={formData} setFormData={setFormData} setIsLoggedIn={setIsLoggedIn} />
            <Link className="login__link" to={'/'}>
                <p>New to this app? Click here to register!</p>
            </Link>
          </section>
        </>
    </div>
  );
};

export default LoginPage;