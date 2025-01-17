let express = require("express");
let {
  getArticles,
  getComments,
  getArticleById,
  getCommentById,
  getUserById,
} = require("./articles");

const app = express();
app.use(express.json());

//1
app.get("/api/articles", async (req, res) => {
  try {
    let result = await getArticles();
    if (result.length === 0) {
      return res.status(404).json({ error: "No articles found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//2
app.get("/api/articles/:id", async (req, res) => {
  try {
    let artId = parseInt(req.params.id);
    let result = await getArticleById(artId);
    if (!result) return res.status(404).json({ error: "Article not found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//3
app.get("/api/comments", async (req, res) => {
  try {
    let result = await getComments();
    if (result.length === 0)
      return res.status(404).json({ error: "No comments found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//4
app.get("/api/comments/:id", async (req, res) => {
  try {
    let commentId = parseInt(req.params.id);
    let result = await getCommentById(commentId);
    if (!result) return res.status(404).json({ error: "Comment not found" });
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
    if (!result) return res.status(404).json({ error: "User not found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
