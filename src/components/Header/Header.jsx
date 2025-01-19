import { useNavigate } from "react-router-dom";
import './Header.scss'
import Logo from "../../assets/logos/Logo.png"
import Button from "../Button/Button";

function Header (){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return(
        <section className="header">
            <img className="header__logo" src={Logo} alt="Logo"/>
            <Button onClick={handleLogout}>Logout</Button>
        </section>
    )
}

export default Header;