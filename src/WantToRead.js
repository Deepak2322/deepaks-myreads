import React from 'react'
import Authors from './Authors'
import ShelfChanger from './ShelfChanger'

class WantToRead extends React.Component {
    state = {
        wantToRead: []
    }

    componentWillReceiveProps(props) {
        let wantToRead = props.books.filter((book) => {
            return book.shelf === 'wantToRead';
          })
          this.setState(() => ({
            wantToRead
          }))
    }

    render() {
        const books = this.state.wantToRead 
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => {
                            return (
                                <li>
                                    <div className="book">
                                        <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail +')' }}></div>
                                        <div className="book-shelf-changer">
                                        <ShelfChanger onShelfChange={this.props.onShelfChange} id={book.id}/>
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

export default WantToRead;