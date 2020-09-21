import React from 'react'
import Authors from './Authors'
import ShelfChanger from './ShelfChanger'

class WantToRead extends React.Component {
  

    render() {
        const books = this.props.books.filter(
            (book) => book.shelf === 'wantToRead'
        ); 
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
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks? `url(${book.imageLinks.thumbnail})`:'' }}></div>
                                        <div className="book-shelf-changer">
                                        <ShelfChanger onShelfChange={this.props.onShelfChange} shelf={book.shelf} id={book.id}/>
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