let express = require("express");

const app = express();
app.use(express.json());

let users = [];
let books = [];
let reviews = [];

function validateUser(user) {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required & must be in String.";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is required & must be in String.";
  }
  return null;
}

//1
app.post("/api/users", (req, res) => {
  let error = validateUser(req.body);
  if (error) return res.status(400).json(error);
  let user = { id: users.length + 1, ...req.body };
  return res.status(201).json(user);
});

function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    return "Title is required & must be in String.";
  }
  if (!book.author || typeof book.author !== "string") {
    return "Author is required & must be in String.";
  }
  return null;
}

//2
app.post("/api/books", (req, res) => {
  let error = validateBook(req.body);
  if (error) return res.status(400).json(error);
  let book = { id: users.length + 1, ...req.body };
  return res.status(201).json(book);
});

function validateReview(review) {
  if (!review.content || typeof review.content !== "string") {
    return "Content is required & must be in String.";
  }
  if (!review.userId || typeof review.userId !== "number") {
    return "userId is required & must be in Number.";
  }
  return null;
}

//3
app.post("/api/reviews", (req, res) => {
  let error = validateReview(req.body);
  if (error) return res.status(400).json(error);
  let review = { id: users.length + 1, ...req.body };
  return res.status(201).json(review);
});

module.exports = { app, validateBook, validateReview, validateUser };
