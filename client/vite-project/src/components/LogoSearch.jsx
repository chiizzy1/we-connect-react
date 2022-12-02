import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

const LogoSearch = () => {
  return (
    <div className='flex gap-3 p-4'>
        <div className="font-poppins text-gradient cursor-pointer text-[18px]">9jaConnect</div>
        <div className="flex rounded-sm bg-cyan-700">
            <input type="text" className='bg-transparent border-0 outline-0' placeholder='#Explore' />
            <div className="flex justify-center items-center bg-orange-500 rounded">
                <AiIcons.AiOutlineSearch className=''/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch