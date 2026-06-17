import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Middleware
app.use(express.json());

// Main Page
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Library
let books = [
    { id: 1, title: "The Great Gatsby" },
    { id: 2, title: "1984" }
];

// GET: Fetch all books
app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/view', (req, res) => {
    res.render('books', { books: books });
})

// POST: Add a new book
app.post('/books', (req, res) => {
    books.push({ id: books.length + 1, title: req.body.title });
    res.status(201).json(books);
})

// PATCH: Update a book's title by ID
app.patch('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const book = books.find(b => b.id === parseInt(id));
        book.title = title;
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ success: false, message: 'Book not found' });
    } 
});

// DELETE: Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    try {
        const index = books.findIndex(b => b.id === parseInt(id));
        if (index === -1) {
            throw new Error("Book not found in library.")
        }
        books.splice(index, 1);
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    } 
});

// Secrets
app.get('/secrets', (req, res) => {
    res.send(process.env.SPOTIFY_KEY);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});