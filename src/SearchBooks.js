import React from 'react'
import { Link } from 'react-router-dom';
import Authors from './Authors'
import ShelfChanger from './ShelfChanger'
import App from './App.js'
import * as Books from './BooksAPI'
class SearchBooks extends React.Component {
    
    render() {

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
                <button className="close-search">
                  Close
                </button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={(event) => {this.props.onSearch(event.target.value)}} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.props.booksList.map((book) => {
                  return (   
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})`: '' }}></div>
                            <div className="book-shelf-changer">
                                <ShelfChanger onShelfChange={this.props.onShelfChange} shelf={book.shelf} id={book.id}/>
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