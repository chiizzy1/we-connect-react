import Axios  from 'axios';
import { Link } from "react-router-dom";
import { setUserLogout } from '../features/user/userSlice';
import { useDispatch } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { navLinks } from "../constants";
import { menu, close } from "../assets"
import styles from "../style"


const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()


// Get Post and Comments attached to it
  async function signOut() {
      const { data } = await Axios.get(`/api/logout`,  { withCredentials: true })
      // console.log(data);
      return data
  }

  const { isLoading, refetch: logOut } = useQuery(["logout"], signOut, {
    enabled: false,
    onSuccess: (res) => {
      console.log(res);
      dispatch(setUserLogout());
      navigate("/")
    },
    onError: (err) => {
      console.log(err);
    },
  })


{/* <Link to="/profile"> Profile </Link>
      <Link to="/feed"> feed </Link>
      <button style={{color: "red"}} onClick={logOut} >LogOut</button> */}

  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
          <nav className="w-full flex py-6 justify-between items-center navbar">

            <div className="text-gradient">9jaConnect</div>
            {/* Desktop View */}
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>

            {/* Mobile View */}
            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img src={toggle ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain" onClick={() => setToggle(prev => !prev)} />

                <div className={`${ toggle ? "flex": "hidden" } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                    <ul className="list-none flex justify-end items-start flex-1 flex-col">
                      {navLinks.map((nav, index) => (
                        <li
                          key={nav.id}
                          className={`font-poppins font-medium cursor-pointer text-[16px] ${
                            active === nav.title ? "text-white" : "text-dimWhite"
                          } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                          onClick={() => setActive(nav.title)}
                        >
                          <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>
                      ))}
                    </ul>
                </div>
            </div>
        </nav>
      </div>
    </div>
    
  )
}

export default Navbar