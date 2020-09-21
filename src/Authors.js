import React from 'react'

const Authors = (props) => {

    return (
        props.names.map((author, index) => {
            return (
                <div className="book-authors" key={index}>{author}</div>
            )
        })
    )
}

export default Authors;