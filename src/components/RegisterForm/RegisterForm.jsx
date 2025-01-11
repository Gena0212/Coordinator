import { useState } from 'react';
import './RegisterForm.scss'

export default function RegisterForm(){
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
    
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName || !formData.confirmPassword) {
          setErrorMessage("You must fill in all the form fields");
          return;
        }
    
        // Check the format of the email address via a regular expression
        if (!emailRegex.test(formData.email)) {
          setErrorMessage("The email address is not valid. Expected format: x@x.xx");
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
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                onChange={(e) => handleInputChange(e)}
                value={formData.firstName}
              />
            </div>
            <div className="form__group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                onChange={(e) => handleInputChange(e)}
                value={formData.lastName}
              />
            </div>
            <div className="form__group">
              <label htmlFor="emailRegister">Enter the email associated with your google calendar</label>
              <input
                type="text"
                name="email"
                id="emailRegister"
                onChange={(e) => handleInputChange(e)}
                value={formData.email}
              />
            </div>
            <div className="form__group">
              <label htmlFor="passwordRegister">Password</label>
              <input
                type="password"
                name="password"
                id="passwordRegister"
                onChange={(e) => handleInputChange(e)}
                value={formData.password}
              />
            </div>
            <div className="form__group">
              <label htmlFor="confirmPasswordRegister">Confirm your password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPasswordRegister"
                onChange={(e) => handleInputChange(e)}
                value={formData.confirmPassword}
              />
            </div>
            <button>Signup</button>
            {errorMessage && <p>{errorMessage}</p>}
            {success && <p>Success! Redirecting to login page...</p>}
          </form>
        
    )
}