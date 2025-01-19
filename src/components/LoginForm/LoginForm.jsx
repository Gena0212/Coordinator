import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "../../../lib/regex";
import axios from "axios";
import Button from "../Button/Button";


export default function LoginForm({formData, setFormData, setIsLoggedIn}) {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("You must provide a username and a password");
      return;
    }

    // Check the format of the email address via a regular expression
    if (!emailRegex.test(formData.email)) {
      setErrorMessage(
        "The email address is not valid. Expected format: x@x.xx"
      );
      return;
    }

    try {
      // To login, send a POST request to the `/users/login` endpoint
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      setIsLoggedIn(true);

      // To ensure the frontend stays logged in, store the JWT in localStorage
      localStorage.setItem("authToken", data.authToken);

      setTimeout(() => {
        navigate("/google");
      }, 3000);

    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Username</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button type="submit">Sign In</Button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}
