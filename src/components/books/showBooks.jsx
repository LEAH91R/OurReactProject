
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { getBooks, addNewBook } from "./data/booksList";

export const Booklist = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadBooks = async () => {
        setLoading(true);
        try {
            const books = await getBooks();
            setBooks(books);
        } catch (error) {
            console.log('something bad happened', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBooks();
    }, []);

    const addBook = async (event) => {
        event.preventDefault();
        const newBook = {
            id: nanoid(),
            name: event.target.name.value,
            author: event.target.author.value
        }
        event.target.reset();
        
        try {
            const updatedBooks = await addNewBook(newBook);
            setBooks(updatedBooks); // עדכון רשימת הספרים
        } catch (error) {
            console.log('something bad happened during adding a book', error);
        }
    }

    return (
        <>
            <h2>List of Books</h2>
            <h4>{loading && 'טעינה...'}</h4>
            <h4>{error && 'אירעה שגיאה, בבקשה נסה שוב מאוחר יותר'}</h4>
            <ul>
                {books.map((b) => (<li key={b.id}>{b.name} - {b.author}</li>))} {/* הוספת שמות סופרים */}
            </ul>

            <form onSubmit={addBook}>
                <input type="text" name="name" placeholder='שם הספר' required />
                <input type="text" name="author" placeholder='שם הסופר' required />
                
                <button type="submit">הוסף ספר חדש</button>
            </form>
        </>
    );
}