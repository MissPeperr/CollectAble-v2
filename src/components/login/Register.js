import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const registerNewUser = (event) => {
        firebase.auth().fetchSignInMethodsForEmail(email).then(response => {
            console.log(response)
            if(confirmPassword !== password){
                alert("Passwords do not match.")
            } else if (response.length === 0){
                return firebase.auth().createUserWithEmailAndPassword(email, password)
            } else if (response.length > 0){
                alert("That email is already in use.")
            } else {
                alert("Something went wrong. Please try again.")
            }   
        })
    }

    return (
        <div className="register">
            <label>Email:</label>
            <input
                onChange={event => {
                    setEmail(event.target.value);
                }}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={event => {
                    setPassword(event.target.value);
                }}
            />
            <label>Confirm Password:</label>
            <input
                type="password"
                onChange={event => {
                    setConfirmPassword(event.target.value);
                }}
            />
            <button
                onClick={(event) => {
                    registerNewUser(event, email, password);
                }}
            >
                Register
          </button>
        </div>
    );
}

export default Register