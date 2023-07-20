import React, { memo } from 'react'

interface IProps{
    label?:string,
    value?:string,  
    setValue?:any
    keyPayload?:string
    invalidFields?:any
    setInvalidFields?:any
    type?:string
}

const InputForm:React.FC<IProps> = ({ label, value, setValue, keyPayload, invalidFields, setInvalidFields, type }) => {
    return (
        <div>
            <label htmlFor={keyPayload} className='text-md block mb-1'>{label}</label>
            <input
                type={type || 'text'}
                id={keyPayload}
                className='outline-none bg-gray-100 p-2 rounded-lg w-full'
                value={value}
                // onChange={(e) => setValue((prev:any) => ({ ...prev, [keyPayload]: e.target.value }))}
                // onFocus={() => setInvalidFields([])}
            />
            {/* {invalidFields.length > 0 && invalidFields.some((i:any) => i.name === keyPayload) && <small className='text-red-500 italic' >{invalidFields.find((i:any) => i.name === keyPayload)?.message}</small>} */}
        </div>
    )
}

export default memo(InputForm)