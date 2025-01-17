let games = [
  { id: 1, title: "The Legend of Zelda", genreId: 1 },
  { id: 2, title: "Super Mario Bros", genreId: 2 },
];

let genres = [
  { id: 1, name: "Action-Adventure" },
  { id: 2, name: "Platformer" },
];

async function getGames() {
  return games;
}

async function getGameById(id) {
  let result = games.find((ele) => ele.id === id);
  return result;
}

async function getGenres() {
  return genres;
}

async function getGenreById(id) {
  let result = genres.find((ele) => ele.id === id);
  return result;
}

module.exports = { getGames, getGenres, getGameById, getGenreById };
