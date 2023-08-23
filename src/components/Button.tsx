import React from 'react'

type ButtonProps = {
    children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button {...props} className=''>
            {children}
        </button>
    )
}
