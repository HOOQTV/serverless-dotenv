const fs = require('fs');
const dotenv = require('dotenv');

module.exports = class ServerlessDotenv {
  constructor(serverless) {
    this.serverless = serverless;
    this.hooks = {
      'before:deploy:createDeploymentArtifacts': () => {
        const env = dotenv.parse(fs.readFileSync('.env'));
        if (!this.serverless.service.provider.environment) {
          this.serverless.service.provider.environment = {};
        }
        Object.assign(this.serverless.service.provider.environment, env);
      },
      'invoke:local:loadEnvVars': () => {
        const env = dotenv.parse(fs.readFileSync('.env'));
        if (!this.serverless.service.provider.environment) {
          this.serverless.service.provider.environment = {};
        }
        Object.assign(this.serverless.service.provider.environment, env);
      }
    };
  }
}
