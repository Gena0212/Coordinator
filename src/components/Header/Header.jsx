import { Link, useNavigate } from "react-router-dom";
import './Header.scss'
import Logo from "../../assets/logos/Logo.png"
import Button from "../Button/Button";

function Header ({isLoggedIn}){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    return(
        <section className={`header ${isLoggedIn ? '': 'header--loggedout'}`}>
            <Link className='header__link' to={'/home'} >
                <img className='header__logo' src={Logo} alt="Logo"/>
            </Link>
            {isLoggedIn && <Button onClick={handleLogout} className= 'button--logout'>Logout</Button>}
        </section>
    )
}

export default Header;