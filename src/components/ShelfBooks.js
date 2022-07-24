import Book from "./Book";

const ShelfBooks = ({books , section , movingBookShelf , category}) => {
  const catergoriesOfBooks = books.filter((b) => b.shelf === category);
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{section} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {catergoriesOfBooks.map(book => (
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