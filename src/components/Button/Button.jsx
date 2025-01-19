import './Button.scss';

function Button({type, onClick, children}) {
    return(
        <button className="button" onClick={onClick}>{children}</button>
    )
}

export default Button;