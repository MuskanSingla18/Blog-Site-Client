import React, { useState ,useContext} from "react";
import axios from "axios";
import "./login.css";
import { AuthContext } from "../../AuthContext";
import back from "../../assets/images/my-account.jpg";

export const Regsiter = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { authToken } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      username,
      email,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_URL}/users`, postData)
      .then((response) => {
        console.log(response.data);
        setUsername("");
        setPassword("");
        setEmail("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Register</h3>
              <h1>My account</h1>
            </div>
          </div>
          {!authToken && <div><br></br><p
          style={{
            textAlign: "center",
            fontSize: "24px",
          }}
        >
          Only Owner Can Register New Admins
        </p></div>}
        {authToken && 
          <form onSubmit={handleSubmit}>
            <span>Email address *</span>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <span>Username *</span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <span>Password *</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span>Confirm Password *</span>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button className="button">Register</button>
          </form>
        }
        </div>
      </section>
    </>
  );
};
