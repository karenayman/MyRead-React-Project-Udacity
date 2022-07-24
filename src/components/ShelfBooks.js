import Book from "./Book";

const ShelfBooks = ({books , section , movingBookShelf}) => {

    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{section} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
            <li key={book.id}>
             <Book book={book} changeShelf={movingBookShelf} />
            </li>
            ))}
          </ol>
        </div>
      </div>
    )
}
export default ShelfBooks;