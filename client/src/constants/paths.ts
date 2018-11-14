import * as config from '../../../config';

const development = {
  BASE_API_PATH: `http://localhost:${config.serverPort}/api`,
  BASE_CLIENT_PATH: `http://localhost:${config.clientPort}`,
  BASE_SERVER_PATH: `http://localhost:${config.serverPort}`,
};

const production = {
  BASE_API_PATH: `http://localhost:${config.serverPort}/api`,
  BASE_CLIENT_PATH: `http://localhost:${config.clientPort}`,
  BASE_SERVER_PATH: `http://localhost:${config.serverPort}`,
};

export { development, production };
