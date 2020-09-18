import React from 'react'

const ShelfChanger = (props) => {
    return (
        <select value={props.shelf ? props.shelf : 'none'} onChange={(e) => {props.onShelfChange(props.id, e)}}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    )
}

export default ShelfChanger;