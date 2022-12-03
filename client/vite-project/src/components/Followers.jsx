import React from 'react'
import Button from './Button'

const Followers = ({data, id}) => {
  return (
    <div className='flex justify-between items-center ' key={id}>
        
        <div className="flex gap-1">
            <img src={data.img} alt="user-img" className='h-12 w-12 rounded-full'/>
            <div className="flex flex-col items-start justify-center">
                <span className="">{data.name}</span>
                <span className=""></span>
            </div>
        </div>

        <Button text="follow" style="py-2 px-4" />
    </div>
  )
}

export default Followers