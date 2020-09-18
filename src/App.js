import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as Books from './BooksAPI'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import { Link, Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    allBooks: [],
    query: '',
    shelf: ["Move to...", "Currently Reading", "Want to Read", "Read", "None"],
  }

  componentDidMount() {
    console.log("Got all books");
    Books.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  changeShelf = (id, e) => {
    let shelf = e.target.value;
    const changedShelf = this.state.books.filter(book => id === book.id);
    const searchedBooks = this.state.allBooks.filter(book => id === book.id);
    if(this.isExistingBook(id)) {
      changedShelf[0].shelf = shelf;
      Books.update(changedShelf[0], e.target.value)
      .then((book) => {
        this.setState((currentState) => ({
          books: currentState.books.concat([book])
        }))
      })
    } else {
      searchedBooks[0].shelf = shelf;
      Books.update(searchedBooks[0], e.target.value)
      .then((book) => {
        this.setState((currentState) => ({
          books: currentState.books.concat([book])
        }))
      })
    }
  }

  isExistingBook = (id) => {
    const bookIds = [];
    this.state.books.forEach((book) => bookIds.push(book.id));
    return bookIds.includes(id) ? true : false
  }

  handleSearch = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
    query !== '' && Books.search(this.state.query)
    .then((books) => {
      if(books === undefined || books.error) {
        this.setState(() => ({
          allBooks: []
        }))
      } else {
        this.setState(() => ({
          allBooks: books
        }))
      }
    })
  }

  render() {

    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Route path='/search' render={({history}) => (
              <SearchBooks 
              onSearch={this.handleSearch} 
              booksList={this.state.allBooks} 
              query={this.state.query} 
              onShelfChange={this.changeShelf}/>
            )}/>
            <div className="list-books-content">
                <Route exact path='/' render={() => (
                  <div>
                      <CurrentlyReading books={this.state.books} shelf={this.state.shelf} onShelfChange={this.changeShelf}/>
                      <WantToRead books={this.state.books} shelf={this.state.shelf} onShelfChange={this.changeShelf}/>
                      <Read books={this.state.books} shelf={this.state.shelf} onShelfChange={this.changeShelf}/>
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
