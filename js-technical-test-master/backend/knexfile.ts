// DO NOT TOUCH

import path from 'path';

const config = {
  client: 'mysql2',
  connection: {
    host: 'db_eleven',
    user: 'root@localhost',
    password: '',
    database: '',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, 'src', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'seeds'),
  },
  pool: {
    min: 2,
    max: 10,
  },
  useNullAsDefault: true,
};

export default config;
