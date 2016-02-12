import Ember from 'ember';

export default Ember.Controller.extend({

    guardData: Ember.inject.service('guard-data'),
    devices: null,

    init: function() {
        this._super(...arguments);
        this.get('guardData').addDeviceObserver(this, 'onGuardDataUpdate');
    },

    onGuardDataUpdate: function(sender, key, value, rev) {
        var devices = this.get('guardData').getDevices();
        var _d = [];
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            var status = "device-ok";
            if (device.status != "ok")
                status = "device-error"
            var guardCount = 0;
            var alarmCount = 0;
            for (var j = 0; j < device.guards.length; j++) {
                var guard = device.guards[j];
                guardCount++;
                alarmCount += guard.alarms.length;
            }
            _d.push(
                {
                    name: device.name,
                    guardCount: guardCount,
                    alarmCount: alarmCount,
                    status: status,
                });
        }
        this.set('devices', _d);
    },
});
