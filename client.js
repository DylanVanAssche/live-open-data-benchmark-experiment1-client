require('dotenv').config()

const process = require('process');
const PollingClient = require('./polling.js');
const PubSubClient = require('./pubsub.js');
const config = require('./config.json');
const podName = process.env.POD_NAME? process.env.POD_NAME: config.defaultPodName;

// Check arguments
let mode = process.env.MODE || 'polling';
let client;

// Create the right client depending on the arguments
if(mode == 'polling') {
    client = new PollingClient();
}
else if(mode == 'pubsub') {
    client = new PubSubClient();
}
console.info(`Operating as ${mode} client`);