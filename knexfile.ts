export = {
  
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "task_management",
      user: "root",
      password: "mysql"
    },
    migrations: {
      extensions: [ "js", "ts" ]
    },
    debug: true
  },
  
  staging: {
    client: "mysql",
    connection: {
      database: "task_management",
      user: "root",
      password: "mysql"
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
    client: "mysql",
    connection: {
      database: "task_management",
      user: "root",
      password: "mysql"
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
