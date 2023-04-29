import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  //   const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:8000/ide/login/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert(data.error);
        } else {
          sessionStorage.setItem("jwt", data.token);
          navigate("/code");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRegister = async () => {
    fetch("http://localhost:8000/ide/register/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          window.alert(data.error);
        } else {
          window.alert("account created successfully. Please Login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Login-container">
      <div className="Login-Title">
        <h1>Algo IDE</h1>
      </div>
      <div>
        <h2>Login / Register</h2>
        <div className="input-div">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="input-div">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-div">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="Login-buttons">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
