import React, {useEffect,useState} from "react"
import "./blog.css"
import axios from "axios"
import { blog, category } from "../../assets/data/data"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from "react-router-dom"

export const Card = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getRandomImage = () => {
    const categories = Object.values(category);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return randomCategory.cover;
  };


  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {blog.map((item) => (
            <div className='box boxItems' key={item.id}>
              <div className='img'>
                <img src={item.cover} alt='' />
              </div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  <a href='/'>#{item.category}</a>
                </div>
                <Link to={`/details/${item.id}`} className='link'>
                  <h3>{item.title}</h3>
                </Link>
                <p>{item.desc.slice(0, 180)}...</p>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{item.date}</label>
                  <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
                  <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
                </div>
              </div>
            </div>
          ))}

          {posts.map((post) => (
            <div className="box boxItems" key={post._id}>
              <div className="img">
                <img src={getRandomImage()} alt="" />
              </div>
              <div className="details">
                <div className="tag">
                  <AiOutlineTags className="icon" />
                  <a href="/">#{post.tag}</a>
                </div>
                <Link to={`/details/${post._id}`} className="link">
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.content.slice(0, 180)}...</p>
                <div className="date">
                  <AiOutlineClockCircle className="icon" /> <label htmlFor="">{post.createdate}</label>
                  <AiOutlineComment className="icon" /> <label htmlFor="">27</label>
                  <AiOutlineShareAlt className="icon" /> <label htmlFor="">SHARE</label>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  )
}
