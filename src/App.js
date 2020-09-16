import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as Books from './BooksAPI'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import SearchBooks from './SearchBooks'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    shelf: ["Move to...", "Currently Reading", "Want to Read", "Read", "None"],
    showSearchPage: false
  }

  componentDidMount() {
    Books.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }


  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Route path='/search' component={SearchBooks}/>
            <div className="list-books-content">
                <Route exact path='/' render={() => (
                  <div>
                     <CurrentlyReading books={this.state.books} shelf={this.state.shelf}/>
                      <WantToRead books={this.state.books} shelf={this.state.shelf}/>
                      <Read books={this.state.books} shelf={this.state.shelf}/>
                  </div>
                )}/>
               
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button>Add a book</button>
              </Link>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
