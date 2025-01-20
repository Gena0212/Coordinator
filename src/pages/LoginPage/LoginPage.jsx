import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginForm from '../../components/LoginForm/LoginForm';
import Header from '../../components/Header/Header';
import './LoginPage.scss'
import { Link } from 'react-router-dom';
// import googleButton from '../../assets/images/btn_google_signin_dark_pressed_web.png'


const LoginPage = ({formData, setFormData}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const apiURL = import.meta.env.VITE_API_BASE_URL


  useEffect(() => {
    // Function to extract authorization code from URL query parameters
    const getAuthorizationCode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      // if (code) { 
      //   // Exchange the authorization code for an access token
      //   exchangeAuthorizationCodeForAccessToken(code);
      // }
    };

    getAuthorizationCode();
  }, []);

  // function navigate(url){
  //   window.location.href = url;
  // }
  
  // async function auth(){
  //   try {
  //     const response = await axios.post(`${apiURL}/request/${formData.email}`)
  //     console.log(response.data);
  //     navigate(response.data.url);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  return (
    <div>
      {/* {isLoggedIn ? ( */}
        {/* // <button type="button" onClick={()=> auth()}>
        //       <img src={googleButton} alt='google sign in'/>
        //     </button> */}
      {/* ) : ( */}
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
      {/* )} */}
    </div>
  );
};

export default LoginPage;