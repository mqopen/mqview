import Ember from 'ember';

export default Ember.Controller.extend({
    init: function() {
        this._super();
        var socket = this.get('websockets').socketFor('ws://localhost:8765/');
        socket.on('open', this.myOpenHandler, this);
        socket.on('message', this.myMessageHandler, this);
        socket.on('close', function(event) {
            console.log('closed');
        }, this);
    },
    message: '',

    myOpenHandler: function(event) {
        console.log('On open event has been called: ' + event);
    },

    myMessageHandler: function(event) {
        var msg = JSON.parse(event.data);
        this.handleDevices(msg.devices);
    },

    handleDevices(devices) {
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            var guardsCount = 0;
            var alarmsCount = 0;
            for (var j = 0; j < device.guards.length; j++) {
                var guard = device.guards[j];
                guardsCount++;
                alarmsCount += guard.alarms.length;
            }
            var deviceStatus = "device-ok";
            if (device.status != "ok") {
                deviceStatus = "device-error"
            }
            this.store.createRecord("device", {
                name: device.name,
                description: device.description,
                guardsCount: guardsCount,
                alarmsCount: alarmsCount,
                status: deviceStatus});
        }
    },
});
