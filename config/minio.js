/**
 * Setup dot env and load from env file
 */

require('dotenv').config();



module.exports = {
    endPoint:process.env.endPoint,
    port: process.env.Port,
    useSSL: process.env.useSSL === 'true',
    accessKey: process.env.accessKey,
    secretKey: process.env.secretKey
  };
  

