import React from 'react'

interface TagProps {
    text: string;
}
const Tag:React.FC<TagProps> = ({ text }) => {
    return (
        <span
            className="text-xs rounded-full bg-slate-600 px-3">
            {text}
        </span>
    )
}

export default Tag