const staging = {
  port: 3000,
  envName: 'staging',
  hashPasswordSecret: 'myApp',
};

const production = {
  port: 5000,
  envName: 'production',
  hashPasswordSecret: 'myAppProd',
};

const getEnvVars = (env = 'staging') => {
  switch (env) {
    case 'production':
      return production;

    default:
      return staging;
  }
};

const environment = getEnvVars(process.env.NODE_ENV);

module.exports = environment;
