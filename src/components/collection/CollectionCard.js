import React from "react"

const CollectionCard = (props) => (
    <section className="collection">
        <h3 className="collection__name">{props.collection.name}</h3>
        <div className="collection__desc">{props.collection.description}</div>
    </section>
)

export default CollectionCard