export default function RegisterPage() {

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
    
        if (!formData.email || !formData.password || !formData.name) {
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
            name: formData.name,
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
        <main>
          <h2>Register</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="firstName">Name</label>
              <input
                type="text"
                name="firstName"
                id="firsName"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="emailRegister">Email</label>
              <input
                type="text"
                name="email"
                id="emailRegister"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="passwordRegister">Password</label>
              <input
                type="password"
                name="password"
                id="passwordRegister"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <button>Signup</button>
            {errorMessage && <p>{errorMessage}</p>}
            {success && <p>Success! Redirecting to login page...</p>}
          </form>
        </main>
      );
}