const BASE_URL = 'http://localhost:4040';

const Scores = {
  async create(score) {
    const result = await fetch(`${BASE_URL}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(score)
    })
    return result.json();
  },
  async getScores() {
    const result = await fetch(`${BASE_URL}/scores`);
    return result.json();
  },
  async checkIfHighScore(score){
    const result = await fetch(`${BASE_URL}/scores/${score}`);
    return result.text();
  }
};


export { Scores };