import HeaderApp from "./HeaderApp";
import {Link} from 'react-router-dom';
import ShelfBooks from "./ShelfBooks";

const MainPageHome =({books , movingBookShelf}) => {

    return (
        <div className="list-books">
         <HeaderApp />
          <div className="list-books-content">
          <ShelfBooks books={books} movingBookShelf={movingBookShelf} category="currentlyReading" section="Currently Reading" />
          <ShelfBooks books={books} movingBookShelf={movingBookShelf} category="wantToRead" section="Want To Read" />
          <ShelfBooks books={books} movingBookShelf={movingBookShelf} category="read" section="Read" />
          </div>
          <div className="open-search">
            <Link to="/search">
            <button>Add a book</button>
            </Link>
          </div>
        </div>
    )
}
export default MainPageHome;