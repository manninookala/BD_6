let express = require("express");
let { getGames, getGenres, getGameById, getGenreById } = require("./games");

const app = express();
app.use(express.json());

//1
app.get("/api/games", async (req, res) => {
  try {
    let result = await getGames();
    if (result.length === 0) {
      return res.status(404).json({ error: "No games found" });
    }
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//2
app.get("/api/games/:id", async (req, res) => {
  try {
    let gameId = parseInt(req.params.id);
    let result = await getGameById(gameId);
    if (!result) return res.status(404).json({ error: "Game not found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//3
app.get("/api/genres", async (req, res) => {
  try {
    let result = await getGenres();
    if (result.length === 0)
      return res.status(404).json({ error: "No genres found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//4
app.get("/api/genres/:id", async (req, res) => {
  try {
    let genretId = parseInt(req.params.id);
    let result = await getGenreById(genretId);
    if (!result) return res.status(404).json({ error: "Genre not found" });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
