import React, { useState , useContext } from "react"
import "./details.css"
import "../../components/header/header.css"
import img from "../../assets/images/b5.jpg"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { useParams, useHistory } from "react-router-dom"
import { useEffect } from "react"
import { blog, category } from "../../assets/data/data"
import axios from "axios";
import { AuthContext } from "../../AuthContext";


export const DetailsPages = () => {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();
  const [blogs, setBlogs] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedTag, setEditedTag] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const selectedBlog = blog.find((blog) => blog.id === parseInt(id));
    if (selectedBlog) {
      setBlogs(selectedBlog);
    } else {
      axios
        .get(`${process.env.REACT_APP_URL}/posts`)
        .then((response) => {
          const posts = response.data;
          const selectedPost = posts.find((post) => post._id === id);
          setBlogs(selectedPost);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);


  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_URL}/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        // Redirect to another page after successful deletion
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const getRandomImage = () => {
    const categories = Object.values(category);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return randomCategory.cover;
  };


  const handleEdit = () => {
    setEditedTitle(blogs.title);
    setEditedTag(blogs.tag);
    setEditedContent(blogs.content);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleApplyChanges = () => {
    const updatedPost = {
      title: editedTitle,
      tag: editedTag,
      content: editedContent,
    };

    axios
      .put(`${process.env.REACT_APP_URL}/posts/${id}`, updatedPost)
      .then((response) => {
        console.log(response.data);
        // Close the modal and update the post data
        setShowEditModal(false);
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  
  return (
    <>
      {blogs ? (
        <section className='singlePage'>
          <div className='container'>
            <div className='left'>
              <img src={blogs.cover || getRandomImage()} alt='' />
            </div>
            {!showEditModal ?
            <div className='right'>
              <div className='buttons'>
              <button className="button" onClick={handleEdit}>
                  <BsPencilSquare />
                </button>
                <button className="button" onClick={authToken && handleDelete}>
                  <AiOutlineDelete />
                </button>
              </div>
              <h1>{blogs.title}</h1>
              <p>{blogs.desc || blogs.content}</p>
              <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?" Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>
              <p>{blogs.author || "Muskan Singla"}</p>
            </div> : null}
          </div>
        </section>
      ) : null}

      {showEditModal && (
                    <div>
                               <form>
            <button className="close cross-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Edit Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Tag"
              value={editedTag}
              onChange={(e) => setEditedTag(e.target.value)}
            />

            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></textarea>

            <button className="button" onClick={handleApplyChanges}>
              Apply Changes
            </button>
          </form>
                  <br></br>
                  </div>
      )}
    </>
  )
}
