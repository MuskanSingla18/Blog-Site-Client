import React, { useState, useContext } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { BsBagCheck } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai"
import { GrHelp } from "react-icons/gr"
import { BiLogOut } from "react-icons/bi"
import { RiImageAddLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { AuthContext } from "../../AuthContext";
import { avatar } from "../../assets/data/data"

export const User = () => {
  const user = true
  const [profileOpen, setProfileOpen] = useState(false);
  const { admin } = useContext(AuthContext);
  const close = () => {
    setProfileOpen(false)
  }
  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src={avatar[0].cover} alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                <Link to='/account'>
                  <div className='image'>
                    <div className='img'>
                      <img src={avatar[0].cover}  alt='' />
                    </div>
                    <div className='text'>
                      <h4>{admin}</h4>
                      <label>Admin</label>
                    </div>
                  </div>
                </Link>
                <Link to='/create'>
                  <button className='box'>
                    <RiImageAddLine className='icon' />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to='/register'>
                  <button className='box'>
                    <IoSettingsOutline className='icon' />
                    <h4>Create Account</h4>
                  </button>
                </Link>
                {/* <button className='box'>
                  <BsBagCheck className='icon' />
                  <h4>My Order</h4>
                </button>
                <button className='box'>
                  <AiOutlineHeart className='icon' />
                  <h4>Wishlist</h4>
                </button> */}
                <button className='box'>
                  <GrHelp className='icon' />
                  <h4>Help</h4>
                </button>
                <Link to='/login'>
                <button className='box'>
                  <BiLogOut className='icon' />
                  <h4>Log Out</h4>
                </button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <button>My Account</button>
        )}
      </div>
    </>
  )
}
