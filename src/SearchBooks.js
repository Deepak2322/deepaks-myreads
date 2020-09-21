import React from 'react'
import { Link } from 'react-router-dom';
import Authors from './Authors'
import ShelfChanger from './ShelfChanger'
import App from './App.js'
import * as Books from './BooksAPI'
class SearchBooks extends React.Component {
    
  checkShelf = (books) => {
    let searchResults = [];
    this.props.booksList.map(searchBook => {
      let result = books.find(book => book.id === searchBook.id);
      searchBook.shelf = result ? result.shelf : 'none'
      searchResults.push(searchBook);
    })
    return searchResults;
  }  

    render() {
        const searchResults = this.checkShelf(this.props.existingBooks);
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
                <button className="close-search">
                  Close
                </button>
              </Link>
              <div className="search-books-input-wrapper">
                <input type="text" onChange={(event) => {this.props.onSearch(event.target.value)}} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {searchResults && searchResults.map((book) => {
                  return (   
                    book && <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})`: '' }}></div>
                            <div className="book-shelf-changer">
                                <ShelfChanger onShelfChange={this.props.onShelfChange}  shelf={book.shelf} id={book.id}/>
                            </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            { book.authors && <Authors names={book.authors}/> }
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

export default SearchBooks