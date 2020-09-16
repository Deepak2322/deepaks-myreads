import React from 'react'

const Authors = (props) => {

    return (
        props.names.map((author) => {
            return (
                <div className="book-authors">{author}</div>
            )
        })
    )
}

export default Authors;