const Button = ({ className = "", onClick, children }) => {
    const _className = ["btn", ...className.split(" ")]
    return (
        <span className={_className.join(" ")} onClick={onClick}>
            {children}
        </span>
    )
}

export default Button
