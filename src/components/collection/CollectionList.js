import React, { useContext } from "react"
import { CollectionContext } from "../../providers/CollectionProvider"
import CollectionCard from "./CollectionCard"

export default () => {
    const { collections } = useContext(CollectionContext)

    return (
        <>
            <h2>Collection List</h2>
            <div className="collections">
                {
                    collections.map(collObj => <CollectionCard key={collObj.id} collection={collObj} />)
                }
            </div>
        </>
    )
}
