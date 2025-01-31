import { React,useState } from 'react'

import { Eye,EyeClosed } from 'lucide-react'

const Input = ({ icon: Icon,textTypeVal : textTypeVal,type : type ,...props }) => {

    const [check, setcheck] = useState(false)

    const handleEye = ()=>{
        setcheck(!check)
    }

    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <Icon className='size-5 text-green-500' />
            </div>
            <input
                {...props}
                type={(textTypeVal == "false" && !check)?'password' : 'text'}
                className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
            />
            {textTypeVal === "false" && (<div className='absolute inset-y-0 right-0 flex items-center pr-3' onClick={handleEye}>
                {
                    check 
                    ? 
                        <Eye className='size-5 text-green-500 cursor-pointer' /> 
                    : 
                        <EyeClosed className='size-5 text-green-500 cursor-pointer' />
                }
            </div>)}
        </div>
    )
}

export default Input
