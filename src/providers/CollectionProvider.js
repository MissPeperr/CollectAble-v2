import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from './UserProvider'
const firebase = require("firebase");
const db = firebase.firestore();

export const CollectionContext = React.createContext()

export const CollectionProvider = (props) => {
    const [collections, setCollections] = useState([])
    const { user } = useContext(UserContext)

    const getCollection = (id) => {
        return db.collection("collections")
            .doc(`${id}`)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    const getAllCollections = () => {
        return db.collection("collections")
            .where("userId", "==", `${user.uid}`)
            .get()
            .then((querySnapshot) => {
                let collectionArray = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    collectionArray.push({id: doc.id, ...doc.data()})
                });
                if (collectionArray.length > 0) {
                    setCollections(collectionArray)
                }
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const addCollection = (collectionObj) => {
        return db.collection("collections")
            .add({
                name: collectionObj.name,
                description: collectionObj.description,
                userId: collectionObj.userId
            });
    }

    useEffect(() => {
        getAllCollections()
    }, []);

    return (
        <CollectionContext.Provider value={{
            collections, setCollections
        }}>
            {props.children}
        </CollectionContext.Provider>
    )
}