import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

export default function Login() {
  console.log('Login Hit');

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  let history = useHistory();
  let auth = useAuth();

  let login = () => {
    auth.signin(username,password).then((res) => {
      setTimeout(() => {
        history.push("/dashboard");
      }, 2000);
    })
    .catch((err)=>{
      setError(err);
    });
  };

  return (
    <div id="login">
    <h3 className="text-center text-white pt-5">Login form</h3>
    <div className="container">
      <div id="login-row" className="row justify-content-center align-items-center">
        <div id="login-column" className="col-md-6">
          <div id="login-box" className="col-md-12">
            <form id="login-form" className="form" onSubmit={handleSubmit}>
              <h3 className="text-center text-info">Login</h3>
              <div className="form-group">
                <label htmlFor="username" className="text-info">Username:</label><br />
                <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-info">Password:</label><br />
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
              </div>
              <div id="register-link" className="text-right">
                <label className="text-danger">{error}</label>
              </div>
              <div className="form-group">
                <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" disabled={!validateForm()} />
              </div>               
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
