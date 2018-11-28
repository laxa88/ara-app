const config = {
  clientPort: 3031,
  serverPort: 3030,

  host: 'localhost', // server host, used by pool
  port: 5432, // postgres port
  database: 'ara',
  user: 'postgres', // postgres user
  password: 'abcde', // postgres user's password
  secret: 'abcde', // salt secret for passwords

  adminEmail: '',
  adminFName: '',
  adminLName: '',
  adminPass: '',
  superEmail: '',
  superFName: '',
  superLName: '',
  superPass: '',
};

module.exports = config;