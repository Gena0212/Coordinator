export default function LoginForm({setFormData, handleSubmit}) {
    const [errorMessage, setErrorMessage] = useState("");


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        </form>
        <button>Sign In</button>
    </>
    )
}