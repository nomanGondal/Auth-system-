import React, { useState, useEffect } from "react";
import "./Mainpage.css"; // Assuming you have a CSS file for styling
import Navbar from "./Navbar"; // Import your Navbar component
import { useNavigate } from "react-router-dom";
import { use } from "react";
const Mainpage = () => {
const navigate = useNavigate();

 

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !genre || !rating) {
      alert("Please fill in all fields");
      return;
    }

    const book = {
      title,
      author,
      genre,
      rating: parseFloat(rating),
      publishedYear: new Date().getFullYear(), // Assuming current year for simplicity
    };

    try {
      let res;
      if (editingBook) {
        // UPDATE existing book
        const id = editingBook._id || editingBook.id; // whatever your backend uses
        res = await fetch(`http://localhost:3000/api/updatebook/${id}`, {
          method: "PUT", // your controller expects PUT
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        });
      } else {
        // CREATE new book
        res = await fetch("http://localhost:3000/api/addnew", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        });
      }
      if (!res.ok) {
        alert(editingBook ? "Failed to update book" : "Failed to add book");
        return;
      }
      const returned = await res.json();

      if (editingBook) {
        // replace in local list
        setBooks((prev) =>
          prev.map((b) =>
            (b._id || b.id) === (editingBook._id || editingBook.id)
              ? returned
              : b
          )
        );
        alert("Book updated");
      } else {
        setBooks((prev) => [...prev, returned]);
        alert("Book added");
      }

      // reset form
      setEditingBook(null);
      setTitle("");
      setAuthor("");
      setGenre("");
      setRating("");
    } catch (err) {
      console.error("Error saving book:", err);
      alert("Error saving book");
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/allbooks"); // your GET endpoint
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError("Could not load books");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setRating(String(book.rating));
  };

  const handleDelete = async (book) => {
    // 1. Get the identifier safely (works if it's _id or id)
    const id = book._id || book.id;
    if (!id) {
      alert("Missing book ID");
      return;
    }

    // optional: confirm with user
    if (!window.confirm("Are you sure you want to delete this book?"))
      return;

    try {
      // 2. Call the delete endpoint
      const res = await fetch(
        `http://localhost:3000/api/deletebook/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        alert("Failed to delete");
        return;
      }

      // 3. Remove from local state so UI updates immediately
      setBooks((prev) => prev.filter((b) => (b._id || b.id) !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting book");
    }
  };

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
    <div className="page">
      <div className="container">
        <h1 className="heading">Book Collection</h1>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-row">
            <input
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="input"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-row">
            <input
              className="input"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <input
              className="input"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button className="btn primary" type="submit">
              {editingBook ? "Update" : "Add"}
            </button>
            {editingBook && (
              <button
                type="button"
                className="btn secondary"
                onClick={() => {
                  setEditingBook(null);
                  setTitle("");
                  setAuthor("");
                  setGenre("");
                  setRating("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="list-controls">
          <button className="btn" type="button" onClick={fetchBooks}>
            Load Book List
          </button>
        </div>

        {loading && <p className="info-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {books.length > 0 ? (
          <ul className="book-list">
            {books.map((b, i) => (
              <li key={i} className="book-item">
                <div className="book-info">
                  <div className="title">{b.title}</div>
                  <div className="meta">
                    by {b.author} • {b.genre} • Rating: {b.rating}
                  </div>
                </div>
                <div className="actions">
                  <button
                    className="small-btn"
                    onClick={() => startEdit(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="small-btn danger"
                    onClick={() => handleDelete(b)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="info-text">No books to show.</p>
        )}
      </div>
    </div>
    </div>
  );
};
export default Mainpage;
