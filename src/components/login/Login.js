import React, { useState, useContext } from 'react'
import { UserContext } from '../../providers/UserProvider'

export const LoginView = ({ onClick }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div className="login">
        <input
          onChange={event => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <button
          onClick={() => {
            onClick(username, password);
          }}
        >
          Login
        </button>
      </div>
    );
  }
  
export const LogoutView = ({ onClick }) => {
    const { user } = useContext(UserContext);
    return (
      <div>
        <span>You are logged in as {user.email}</span>
        <button onClick={onClick}>Logout</button>
      </div>
    );
  }