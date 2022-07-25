import "./App.css";
import { useState , useEffect } from "react";
import MainPageHome from "./components/MainPageHome";
import Book from "./components/Book";
import * as BooksAPI from "./BooksAPI";
import {BrowserRouter as Router, Switch ,Route ,Link} from 'react-router-dom';
import QueryUsing from "./hook/QueryUsing";

function App() { 
  const [books , setBooks] =useState([]);
  const [query , setQuery] =useState("");
  const [mapOfIdBooks , setMapOfIdBooks] = useState(new Map());
  const [combinedBook , setCombinedBook] = useState([]);
  const [bookSearch ,setBookSearch] = QueryUsing(query);

  useEffect(() => {
    const getAllBooks = async () => {
      const results = await BooksAPI.getAll();
      setBooks(results);
      setMapOfIdBooks(creatingMapOfIdBooks(results)); 
    };
    getAllBooks();
  } , []);

useEffect(() => {
  const compineBook = bookSearch.map(book =>{
    if(mapOfIdBooks.has(book.id)){
      return mapOfIdBooks.get(book.id);
    }else{
      return book;
    }
  })
  setCombinedBook(compineBook);
} ,[bookSearch]);
 
const creatingMapOfIdBooks =(books) => {
  const mapping = new Map();
  books.map(book => mapping.set(book.id, book));
  return mapping;
 };

  const movingBookShelf = (book , to) => {
    const movingBooks = books.map(b => {
if(b.id === book.id){
  book.shelf = to;
  return book;
}
return b;
    })
    if(!mapOfIdBooks.has(book.id)){
      book.shelf = to;
      movingBooks.push(book);
    }
    setBooks(movingBooks);
    BooksAPI.update(book,to);
  };

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/search">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" >
            <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {combinedBook.map(book => (
            <li key={book.id}>
             <Book book={book} changeShelf={movingBookShelf} />
            </li>
            ))}
            </ol>
          </div>
        </div>
        </Route>

         <Route path="/">
        <MainPageHome books={books} movingBookShelf={movingBookShelf} />
        </Route>
         </Switch>
        </Router>
    </div>
  );
}

export default App;
