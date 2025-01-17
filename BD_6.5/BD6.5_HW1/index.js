let express = require("express");

const app = express();
app.use(express.json());

let games = [];
let tournaments = [];

function validateGame(game) {
  if (!game.title || typeof game.title !== "string") {
    return "Title is required & must be in String.";
  }
  if (!game.genre || typeof game.genre !== "string") {
    return "Genre is required & must be in String.";
  }
  return null;
}

//1
app.post("/api/games", (req, res) => {
  let error = validateGame(req.body);
  console.log(error);
  if (error) return res.status(400).json(error);
  let game = { id: games.length + 1, ...req.body };
  games.push(game);
  return res.status(201).json(game);
});

function validateTournament(tour) {
  if (!tour.name || typeof tour.name !== "string") {
    return "Name is required & must be in String.";
  }
  if (!tour.gameId || typeof tour.gameId !== "number") {
    return "gameId is required & must be in Number.";
  }
  return null;
}

//2
app.post("/api/tournaments", (req, res) => {
  let error = validateTournament(req.body);
  if (error) return res.status(400).json(error);
  let tour = { id: tournaments.length + 1, ...req.body };
  tournaments.push(tour);
  return res.status(201).json(tour);
});

module.exports = { app, validateGame, validateTournament };
