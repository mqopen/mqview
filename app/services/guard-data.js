import Ember from 'ember';

export default Ember.Service.extend({
    devices: null,
    brokers: null,
    init: function() {
        this._super(...arguments);
        this.set('devices', []);
        this.set('brokers', []);
    },

    initDevices: function(devices) {
        this.set('devices', devices);
    },

    initBrokers: function(brokers) {
        this.set('brokers', brokers);
    },

    getDevices: function() {
        return this.get('devices');
    },

    getBrokers: function() {
        return this.get('brokers');
    },

    addDeviceObserver: function(target, method) {
        this.addObserver('devices', target, method);
    },

    getDevice: function(name) {
        var devices = this.get('devices');
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            if (device.name == name) {
                return device;
            }
        }
        return null;
    }
});
