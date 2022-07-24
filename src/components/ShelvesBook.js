import ShelfBooks from '../components/ShelfBooks'

const ShelvesBook = ({books , movingBookShelf}) => {
 const curruntlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading");
 const whatToWantBooks = books.filter((book) => book.shelf === "wantToRead");
 const readBooks = books.filter((book) => book.shelf === "read");


 return (
    <div>
     <ShelfBooks title="Curruntly Reading" books={curruntlyReadingBooks} movingBookShelf={movingBookShelf} />
     <ShelfBooks title="Want to read" books={whatToWantBooks} movingBookShelf={movingBookShelf} />
     <ShelfBooks title="Read" books={readBooks} movingBookShelf={movingBookShelf} />
    </div>
 )
}
export default ShelvesBook;