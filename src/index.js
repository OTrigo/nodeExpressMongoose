require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.jp3rynn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
  })
);

app.get("/filme", async (req, res) => {
  const filmes = await Movie.find();
  res.send(filmes);
});

app.post("/filme", async (req, res) => {
  const filme = new Movie({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  await filme.save();
  res.send(filme);
});

app.put("/filme/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  return res.send(movie);
});

app.delete("/filme/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  return res.send(movie);
});

app.listen(port, () => {
  console.log("Escutando porta 3000");
});
