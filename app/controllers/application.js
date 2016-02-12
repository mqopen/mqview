import Ember from 'ember';

export default Ember.Controller.extend({
    guardData: Ember.inject.service('guard-data'),
    init: function() {
        this._super();
        var socket = this.get('websockets').socketFor('ws://localhost:8765/');
        socket.on('open', this.myOpenHandler, this);
        socket.on('message', this.myMessageHandler, this);
        socket.on('close', function(event) {
            console.log('closed');
        }, this);
    },
    treeData: {"text": "aa"},

    myOpenHandler: function(event) {
        console.log('On open event has been called: ' + event);
    },

    myMessageHandler: function(event) {
        var msg = JSON.parse(event.data);
        if (msg.feed == "init") {
            this.get('guardData').initDevices(msg.devices);
            this.get('guardData').initBrokers(msg.brokers);
        } else if (msg.feed == "update") {
        }
    },
});
