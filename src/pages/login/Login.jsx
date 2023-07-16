import React, { useState,useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../AuthContext";
import back from "../../assets/images/my-account.jpg";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const history = useHistory();
  const { setAuthToken , setAdmin } = useContext(AuthContext);
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  setAuthToken(null);
  setAdmin(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_URL}/login`, { username, password })
      .then((response) => {
        const { token } = response.data;
        console.log(response.data);
        if (token) {
          // Store the token in local storage or secure cookie
          localStorage.setItem("token", token);
          setAuthToken(token);
          localStorage.setItem("admin",username);
          setAdmin(username);
          setLoginStatus("Login Successful");
          history.push("/"); // Redirect to home route
        } else {
          setLoginStatus("Invalid Username or Password");
        }

        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.error(error);
        setLoginStatus("Invalid Username or Password");
      });
  };

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <span>Username or email address *</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span>Password *</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="button">Log in</button>
            {loginStatus && <p style={{ color: loginStatus.includes("Successful") ? "green" : "red" }}>{loginStatus}</p>}
          </form>
        </div>
      </section>
    </>
  );
};
