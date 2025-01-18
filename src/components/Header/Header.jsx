import { useNavigate } from "react-router-dom";
import './Header.scss'
import Logo from "../../assets/logos/Logo.png"

function Header (){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return(
        <section className="header">
            <img className="header__logo" src={Logo} alt="Logo"/>
            <button onClick={handleLogout}>Logout</button>
        </section>
    )
}

export default Header;