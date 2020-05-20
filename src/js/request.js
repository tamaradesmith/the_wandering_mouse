const BASE_URL = "https://wandering-mouse-server.herokuapp.com:4040"  //'http://localhost';

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
    const result = await fetch(`${BASE_URL}/scores`, {
      method: "GET",
      mode: 'cors',
    });
    return result.json();
  },
  async checkIfHighScore(score) {
    const result = await fetch(`${BASE_URL}/scores/${score}`, {
      method: "GET",
      mode: 'cors',
    });
    return result.text();
  }
};


export { Scores };