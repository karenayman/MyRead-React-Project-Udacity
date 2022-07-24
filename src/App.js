import "./App.css";
import { useState , useEffect } from "react";
import HeaderApp from "./components/HeaderApp";
import ShelvesBook from "./components/ShelvesBook";
import Book from "./components/Book";
import * as BooksAPI from "./BooksAPI";
// import {useDebounce} from 'use-debounce';
import {BrowserRouter as Router, Switch ,Route ,Link} from 'react-router-dom';
import QueryUsing from "./hook/QueryUsing";

function App() { 
  const [books , setBooks] =useState([]);
  const [query , setQuery] =useState("");
  const [bookSearch ,setBookSearch] = QueryUsing(query);
  const [mapOfIdBooks , setMapOfIdBooks] = useState(new Map());
  const [combinedBook , setCombinedBook] = useState([]);
  // const [value] = useDebounce(query,500);

  useEffect(() => {
BooksAPI.getAll()
.then(data => {
  // console.log(data);
  setBooks(data);
  setMapOfIdBooks(creatingMapOfIdBooks(data)); 
})} , []);

// useEffect(() => {
//   let active =true;
//   if(value){
//     BooksAPI.search(value).then(data => {
//       if(data.error){
//          setBookSearch([]);
//       }else{
//         if(active){
//           // console.log(data);
//           setBookSearch(data);
//         }
//       }
//      })
//   }
//   return () => {
//     active =false ;
//     setBookSearch([]);
//   }
// } , [value]);

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
}

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
  }

 
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
        <div className="list-books">
         <HeaderApp />
          <div className="list-books-content">
           <ShelvesBook books={books} movingBookShelf={movingBookShelf} />
          </div>
          <div className="open-search">
            <Link to="/search">
            <button>Add a book</button>
            </Link>
          </div>
        </div>
        </Route>
         </Switch>
        </Router>
    </div>
  );
}

export default App;
