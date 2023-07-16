import React from "react"
import { AiOutlineGithub,AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai"
import { BsFacebook } from "react-icons/bs"
import { RiInstagramFill } from "react-icons/ri"

export const Footer = () => {
  return (
    <>
      <footer className='boxItems'>
        <div className='container flex'>
          <p>Blog Site - All right reserved - Design & Developed by Muskan Singla</p>
          <div className='social'>
            <BsFacebook className='icon' />
            <RiInstagramFill className='icon' />
            <a href="AiOutlineGithub" target="_blank" rel="noopener noreferrer"><AiOutlineGithub className='icon' /></a>
            <a href="https://www.linkedin.com/in/muskan-singla-8632521bb/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin className='icon' /></a>
          </div>
        </div>
      </footer>
    </>
  )
}


