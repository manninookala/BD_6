let express = require("express");
let {
  getAllBooks,
  getAllReviews,
  getBookById,
  getReviewById,
  getUserById,
} = require("./books");

const app = express();
app.use(express.json());

app.get("/api/books", async (req, res) => {
  try {
    let result = await getAllBooks();
    if (result.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//2
app.get("/api/books/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    let result = await getBookById(bookId);
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//3

app.get("/api/reviews", async (req, res) => {
  try {
    let result = await getAllReviews();
    if (result.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//4

app.get("/api/reviews/:id", async (req, res) => {
  try {
    let revId = parseInt(req.params.id);
    let result = await getReviewById(revId);
    if (!result) {
      return res.status(404).json({ error: "Review not found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//5

app.get("/api/users/:id", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let result = await getUserById(userId);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
