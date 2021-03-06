import React from "react"

const Button = (props) => {

    const { text, onClick, type, isHide, disabled, className } = props
    
    const handleClick = (event) => {
        event.preventDefault()
        onClick()
    }

    const style = {
        cursor: 'pointer',
        display: isHide  ? 'none': 'block'
    }

    return <button className={className} type={type} style={style} onClick={handleClick} disabled={disabled}>{text}</button>
}

export default Button