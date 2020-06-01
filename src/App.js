import React, { useCallback, useContext, useState } from 'react';
import { UserContext } from './providers/UserProvider'
import { LoginView, LogoutView } from './components/login/Login'
import firebase from 'firebase/app'
import 'firebase/auth';
import './services/firestore'

const App = () => {
  const [error, setError] = useState("");
  const { user } = useContext(UserContext)

  function login(username, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }

  const logout = () => {
    firebase.auth().signOut();
  }

  const requestLogin = useCallback((username, password) => {
    login(username, password).catch(error => setError(error.code));
  });

  const requestLogout = useCallback(() => {
    logout();
  }, []);

  if (!user.loggedIn) {
    return <LoginView onClick={requestLogin} error={error} />;
  }
  return (
      <LogoutView onClick={requestLogout} />
  );
}

export default App