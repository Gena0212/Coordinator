import './Button.scss';

function Button({type, onClick, children, className}) {
    return(
        <button className={`button ${className}`} onClick={onClick}>{children}</button>
    )
}

export default Button;