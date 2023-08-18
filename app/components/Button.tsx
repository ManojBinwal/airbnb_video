'use client'
import React from "react";

interface ButtonProps {
    label: string
    //on click take event listener which is a React MouseEvent which accpets <HTML Button Element> and return void.
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: boolean;
}

//get props inside functional component
const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon : Icon
}) => {
    return (
        <button 
        onClick={onClick}
        disabled={disabled}
        className=
        {
            `relative
            disable:opacity-70
            disable:smallursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outline ? 'bg-white' : 'bg-rose-500'} 
            ${outline ? 'border-black' : 'border-rose-500'} 
            ${small? 'text-black' : 'text-white'} 
            ${small ? 'py-1' : 'py-3'} 
            ${small ? 'border-[1px]' : 'border-2'} 
            ${small ? 'font-light' : 'font-semibold'} 
            
            `
        }
        
        > 
        {Icon &&(
            <Icon 
                size = {24}
                className="absolute
                left-4
                top-3
                
                "
                />

        )}
        {label} </button>
    );
}

export default Button;