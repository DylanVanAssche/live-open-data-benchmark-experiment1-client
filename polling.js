const request = require('request');
const BaseClient = require('./base.js')
const config = require('./config.json');

class PollingClient extends BaseClient {
    constructor() {
        super();
        setInterval(this.pollServer, config.pollingInterval, this);
        this.pollServer(this)
    }

    /**
     * Callback method for `setInterval`, this method will poll the server when the `setInterval` timer runs out.
     * The resource usage and event meta data is saved in an Influx DB instance.
     * @param self
     */
    pollServer(self) {
        let requestedAt = new Date();
        //self.saveUsage('polling_requested');

        // Fire up the polling request to the server and wait for the response
        console.log(self.server)
        request(self.server, { json: true}, (err, res, body) => {
           if(err) {
               return console.error(err);
           }
           let receivedAt = new Date();
           //self.saveUsage('polling_received');
           console.debug('Received events!');
           //self.saveReceivedEvent('polling', 0, new Date(body['prov:generatedAtTime']), receivedAt, requestedAt);
        });
    }
}

module.exports = PollingClient;
