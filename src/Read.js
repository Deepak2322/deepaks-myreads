import React from 'react'
import Authors from './Authors'
import ShelfChanger from './ShelfChanger'

class Read extends React.Component {

    state = {
        read: []
    }

    componentWillReceiveProps(props) {
        let read = props.books.filter((book) => {
            return book.shelf === 'read';
          })
          this.setState(() => ({
            read
          }))
          console.log(this.props.shelf);
    }

    render() {
        const books = this.state.read;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => {
                            return (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail +')' }}></div>
                                        <div className="book-shelf-changer">
                                            <ShelfChanger/>
                                        </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <Authors names={book.authors}/>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Read;