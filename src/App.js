import React, {
  useCallback, 
  useContext, 
  useEffect, 
  useState
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'
import './services/firestore';


const defaultUser = { loggedIn: false, email: "" };
const UserContext = React.createContext({});
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;
function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({loggedIn: true, email: user.email});
    } else {
      callback({loggedIn: false});
    }
  });
}
function login(username, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => resolve())
      .catch(error => reject(error));
  });
}
function logout() {
  firebase.auth().signOut();
}
function LoginView({ onClick, error }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
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
      <span>{error}</span>
    </div>
  );
}
function LogoutView({ onClick }) {
  const user = useContext(UserContext);
  return (
    <div>
      <span>You are logged in as {user.email}</span>
      <button onClick={onClick}>Logout</button>
    </div>
  );
}

const App = () => {
  const [user, setUser] = useState( {loggedIn: false} );
  const [error, setError] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    }
  }, []);
  const requestLogin = useCallback((username, password) => {
    login(username, password).catch(error => setError(error.code));
  });
  const requestLogout = useCallback(() => {
    logout();
  }, []);
  if (!user.loggedIn) {
    return <LoginView onClick={requestLogin} error={error}/>;
  }
  return (
    <UserProvider value={user}>
      <LogoutView onClick={requestLogout} />
    </UserProvider>
  );
}

export default App



// import React, { useState, useEffect, useContext, useCallback } from 'react'
// import {login, logout, LoginView, LogoutView} from './components/login/login'
// import firebase from 'firebase/app'
// import 'firebase/auth';
// import './services/firestore'

// // const defaultUser = { loggedIn: false, email: "" };
// // const UserContext = React.createContext(defaultUser);
// const UserProvider = UserContext.Provider;
// const UserConsumer = UserContext.Consumer;

// const onAuthStateChange = (callback) => {
//   return firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       callback({ loggedIn: true, email: user.email });
//     } else {
//       callback({ loggedIn: false });
//     }
//   });
// }

// const App = () => {
//   // const [user, setUser] = useState({ loggedIn: false });
//   const [error, setError] = useState("");
  
//   useEffect(() => {
//     const unsubscribe = onAuthStateChange(setUser);
//     return () => {
//       unsubscribe();
//     }
//   }, []);

//   const requestLogin = useCallback((username, password) => {
//     // login() is func from Login.js
//     login(username, password).catch(error => setError(error.code));
//   });

//   const requestLogout = useCallback(() => {
//     // logout() is from Login.js
//     logout();
//   }, []);

//   if (!user.loggedIn) {
//     return <LoginView onClick={requestLogin} error={error} />;
//   }

//   return (
//     <UserProvider value={user}>
//       <LogoutView onClick={requestLogout} />
//     </UserProvider>
//   );
// }

// export default App;
