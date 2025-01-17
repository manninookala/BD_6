let request = require("supertest");
let http = require("http");

let { app, getAllRecipes, getRecipeById, addNewRecipe } = require("../index");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addNewRecipe: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Recipes API Endpoint Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Fetch all recipes", async () => {
    const mockRecipes = [
      {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
      },
    ];
    getAllRecipes.mockResolvedValue(mockRecipes);

    let result = await request(server).get("/recipes");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipes);
  });

  it("Fetch a recipe by Id", async () => {
    let mockRecipe = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };
    getRecipeById.mockResolvedValue(mockRecipe);

    let result = await request(server).get("/recipes/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipe);
  });

  it("Fetch undefined bu a non-existent Id", async () => {
    getRecipeById.mockResolvedValue(undefined);

    let result = await request(server).get("/recipes/details/44");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({});
  });

  it("Add a new recipe to the list", async () => {
    let mockNew = {
      id: 5,
      name: "newName",
      cuisine: "newCuisine",
      difficulty: "newDiff",
    };
    addNewRecipe.mockResolvedValue(mockNew);

    let result = await request(server).post("/recipes/new").send({
      id: 5,
      name: "newName",
      cuisine: "newCuisine",
      difficulty: "newDiff",
    });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockNew);
  });
});
