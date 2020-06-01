import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'


const defaultUser = { loggedIn: false, email: "" };
export const UserContext = React.createContext(defaultUser)

export const UserProvider = (props) => {
    const [user, setUser] = useState({ loggedIn: false });

    /*
      The state of the user needs to come from an authentication provider, in this case basic firebase email authentication. We are going to setup a listener to changes in auth state in the firebase auth provider. This will keep a connection to the firebase authentication provider, and change whenever the backend state of the logged in user changes.
    */
    const onAuthStateChange = (callback) => {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // this is the setUser function
                callback({ loggedIn: true, email: user.email });
            } else {
                callback({ loggedIn: false });
            }
        });
    }

    // listening to auth state changes when our application mounts
    useEffect(() => {
        // we can bring the data from the auth provider changes to our user state by connecting our setUser hook as a callback to our onAuthStateChange function
        onAuthStateChange(setUser);
        // return () => {
        //     unsubscribe();
        // }
    }, []);

    return (
        <UserContext.Provider value={{
            user, setUser, onAuthStateChange
        }}>
            {props.children}
        </UserContext.Provider>
    )
}