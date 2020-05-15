const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ScoreQuery = require('../db/query/scoreQuery')

router.post("/", (req, res) => {
  const score = {
    name: req.body.name,
    level: req.body.level,
  };
const savedScore = ScoreQuery.create(score);
  res.send(savedScore)
})

router.get("/", async (req, res) => {
  const score = await ScoreQuery.getScores();
  res.send(score);
})

router.get('/:score', async (req, res) => {
  const score = req.params.score;
  const allScores = await ScoreQuery.getScores();
  let newHighScore = false;
  allScores.forEach(level => {
    newHighScore = (level.level < score) ? true : newHighScore;
  });
  newHighScore = (allScores.length < 10) ? true : newHighScore;
  res.send(newHighScore);
})


module.exports = router