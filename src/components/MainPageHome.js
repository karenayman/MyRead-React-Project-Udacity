import HeaderApp from "./HeaderApp";
import ShelvesBook from "./ShelvesBook";
import {Link} from 'react-router-dom';


const MainPageHome =({books , movingBookShelf}) => {

    return (
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
    )
}
export default MainPageHome;