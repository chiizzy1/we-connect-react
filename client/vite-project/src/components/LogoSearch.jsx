import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import styles from '../style';

const LogoSearch = () => {
  return (
    <div className={`flex items-center justify-between p-2 w-full font-poppins ${styles.glassM} rounded`}>
        <div className="font-poppins text-red-500 cursor-pointer">9ja</div>
        <div className="flex rounded-sm">
            <input type="text" className={`border bg-transparent text-lg outline-0 text-white`} placeholder='#Explore' />
            <div className="flex justify-center items-center bg-orange-500 rounded">
                <AiIcons.AiOutlineSearch className=''/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch