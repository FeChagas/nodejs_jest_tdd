module.exports = {
  database: {
    database: 'hoaxfy',
    username: 'felipe',
    password: '8509359eE#',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  },
  mail: {
    host: 'localhost',
    port: Math.floor(Math.random() * 2000) + 10000,
    tls: {
      rejectUnauthorized: false,
    },
  },
  uploadDir: 'uploads-staging',
  profileDir: 'profile',
};
