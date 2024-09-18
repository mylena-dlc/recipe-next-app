import React from 'react'

interface TagProps {
    text: string;
    style?: React.CSSProperties;
    className?: string
}
const Tag:React.FC<TagProps> = ({ text, style, className}) => {
    return (
        <span
            className={`text-xl rounded-full px-4 ${className}`}
            style={style}>
            {text}
        </span>
    )
}

export default Tag