import React from 'react';

const Button = (props) => {
    return (
        <button 
            className={props.className} 
            style={{backgroundColor: props.style.backgroundColor}}
            onClick={props.onToggleForm}
        >
            {props.style.text}
        </button>
    );
}

export default Button;