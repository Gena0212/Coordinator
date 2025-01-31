import { useState } from 'react';
import './RegisterForm.scss'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { emailRegex } from "../../../lib/regex";
import Button from '../Button/Button';

export default function RegisterForm(){
  const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.email.replaceAll(" ", "") || !formData.password.replaceAll(" ", "") || !formData.firstName.replaceAll(" ", "") || !formData.lastName.replaceAll(" ", "") || !formData.confirmPassword.replaceAll(" ", "")) {
          setErrorMessage("You must fill in all the form fields");
          return;
        }

        if(formData.password !== formData.confirmPassword){
          setErrorMessage("Passwords do not match");
          return;
        }
    
        // Check the format of the email address via a regular expression
        if (!emailRegex.test(formData.email)) {
          setErrorMessage("The email address is not valid.");
          return;
        }
    
        try {
          // To register a user, send a POST request to the `/users/register` endpoint
          await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/register`, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          });
    
          setErrorMessage("");
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } catch (error) {
          setErrorMessage(error.message);
        }
    };

    return (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form__group">
              <label htmlFor="firstName" className="register-form__label">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={(e) => handleInputChange(e)}
                value={formData.firstName}
                className="register-form__input"
              />
            </div>
            <div className="register-form__group">
              <label htmlFor="lastName" className="register-form__label">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={(e) => handleInputChange(e)}
                value={formData.lastName}
                className="register-form__input"
              />
            </div>
            <div className="register-form__group">
              <label htmlFor="emailRegister" className="register-form__label">Email linked to your google calendar:</label>
              <input
                type="text"
                name="email"
                id="emailRegister"
                placeholder="Email"
                onChange={(e) => handleInputChange(e)}
                value={formData.email}
                className="register-form__input"
              />
            </div>
            <div className="register-form__group">
              <label htmlFor="passwordRegister" className="register-form__label">Password</label>
              <input
                type="password"
                name="password"
                id="passwordRegister"
                placeholder="Password"
                onChange={(e) => handleInputChange(e)}
                value={formData.password}
                className="register-form__input"
              />
            </div>
            <div className="register-form__group">
              <label htmlFor="confirmPasswordRegister" className="register-form__label">Confirm your password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPasswordRegister"
                placeholder="Re-Enter Password"
                onChange={(e) => handleInputChange(e)}
                value={formData.confirmPassword}
                className="register-form__input"
              />
            </div>
            <Button className='button--form' type="submit">Signup</Button>
            {errorMessage && <p className="register-form__error">{errorMessage}</p>}
            {success && <p>Success! Redirecting to login page...</p>}
          </form>
        
    )
}