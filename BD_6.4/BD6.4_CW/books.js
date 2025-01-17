let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

let reviews = [{ id: 1, bookId: 1, content: "Great book!" }];

let users = [{ id: 1, name: "John Doe", email: "john@example.com" }];


async function getAllBooks() {
  return books;
}

async function getBookById(id) {
  let book = books.find((ele) => ele.id === id);
  return book;
}

async function getAllReviews() {
  return reviews;
}

async function getReviewById(id) {
  let review = reviews.find((ele) => ele.id === id);
  return review;
}

async function getUserById(id) {
  let user = users.find((ele) => ele.id === id);
  return user;
}
  