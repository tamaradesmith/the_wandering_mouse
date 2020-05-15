const knex = require('../../client');

module.exports = {
  async getScores(){
    const score = await knex('scores').select('*').orderBy('level', 'desc').limit(10);
    return score;
  },
 async create(score){
   const newScore = await knex('scores').insert(score).returning('*');
   console.log("create -> newScore", newScore);
   return "saves"
 }
}