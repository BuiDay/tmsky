import React, { memo } from 'react'

interface IProps{
    text?:string,
    textColor?:string, 
    bgColor?:string, 
    IcAfter?:string, 
    onClick?:any, 
    fullWidth?:boolean, 
    px?:string
}

const Button:React.FC<IProps> = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth, px }) => {
    return (
        <button
            type='button'
            className={`py-2 ${px ? px : 'px-2'} ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md flex items-center justify-center`}
            onClick={onClick}
        >
            <span> {text}</span>
            <span>{IcAfter && <IcAfter />}</span>

        </button>
    )
}

export default memo(Button)