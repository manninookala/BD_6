let articles = [
  { id: 1, title: "Introduction to JavaScript", author: "Jane Smith" },
  { id: 2, title: "Advanced CSS Techniques", author: "Tom Brown" },
];

let comments = [{ id: 1, articleId: 1, content: "Very informative article!" }];

let users = [{ id: 1, name: "Alice Johnson", email: "alice@example.com" }];

async function getArticles() {
  return articles;
}

async function getArticleById(id) {
  let result = articles.find((ele) => ele.id === id);
  return result;
}

async function getComments() {
  return comments;
}

async function getCommentById(id) {
  let result = comments.find((ele) => ele.id === id);
  return result;
}

async function getUserById(id) {
  let result = users.find((ele) => ele.id === id);
  return result;
}

module.exports = {
  getArticles,
  getComments,
  getArticleById,
  getCommentById,
  getUserById,
};
