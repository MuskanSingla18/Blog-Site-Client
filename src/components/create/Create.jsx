import React, { useState, useContext } from "react";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AuthContext } from "../../AuthContext";
import "./create.css"

export const Create = () => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const { authToken } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      tag,
      content,
    };

    axios
      .post(`${process.env.REACT_APP_URL}/compose`, postData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTitle("");
        setTag("");
        setContent("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {authToken ? (
        <section className="newPost">
          <div className="container boxItems">
            <div className="img">
              <img
                src="https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="image"
                className="image-preview"
              />
            </div>
            <div className="inputfile flexCenter">
              <input type="file" accept="image/*" alt="img" />
            </div>
            <br></br>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />    

              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <button className="button">Create Post</button>
            </form>
          </div>
        </section>
      ) : (
        <div>
          <br></br>
        <p
          style={{
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          Only Owner Can Compose Blogs
        </p>
        <br></br>
        </div>
      )}
    </>
  );
};
