module.exports = {
  
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "task_management",
      user: "root",
      password: "mysql"
    },
    migrations: {
      extensions: [ "ts" ]
    },
    debug: true
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
  
};
