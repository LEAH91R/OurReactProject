
import React, { useState, useEffect } from 'react';
import { getBooks } from './data/booksList';

export const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadBooks = async () => {
        setLoading(true);
        try {
            const books = await getBooks();
            const authorsList = [...new Set(books.map(book => book.author))]; // הוצאת רשימה ייחודית של סופרים
            setAuthors(authorsList);
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

    return (
        <div>
            <h2>רשימת סופרים</h2>
            <h4>{loading && 'טעינה...'}</h4>
            <h4>{error && 'אירעה שגיאה, בבקשה נסה שוב מאוחר יותר'}</h4>
            <ul>
                {authors.map((a, index) => (<li key={index}>{a}</li>))} {/* השתמש ב-index כמפתח */}
            </ul>
        </div>
    );
};