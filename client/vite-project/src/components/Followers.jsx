import React from 'react'
import Button from './Button'

const Followers = ({data, id}) => {
  return (
    <div className='flex justify-between items-center'>
        
        <div className="flex gap-2">
            <img src={data.img} alt="user-img" className='h-12 w-12 rounded-full'/>
            <div className="flex flex-col items-start justify-center">
                <span className="f">{data.name}</span>
                <span className="f"></span>
            </div>
        </div>

        <Button text="follow" />
    </div>
  )
}

export default Followers