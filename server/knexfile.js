// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'wandering_mouse',
      username: 'tamara',
      password: 'tamara'
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'wander_mouse',
      user: 'tamara',
      password: 'tamara'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'db/migrations',

    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'wander_mouse',

      user: 'tamara',
      password: 'tamara'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'db/migrations',
    }
  }

};
