const Button = ({ onClick, children }) => {
    return (
        <span className="btn" onClick={onClick}>
            {children}
        </span>
    )
}

export default Button