import { useNavigate } from "react-router-dom";
import './Header.scss'

function Header (){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return(
        <section className="header">
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </section>
    )
}

export default Header;