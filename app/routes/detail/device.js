import Ember from 'ember';

export default Ember.Route.extend({
    guardData: Ember.inject.service('guard-data'),
    init: function() {
        this._super(...arguments);
        this.get('guardData').addDeviceObserver(this, function(sender, key, value, rev) {
            this.refresh();
        });
    },
    model: function(params) {
        var device = this.get('guardData').getDevice(params.name);
        if (device) {
            return {
                device: {
                    name: device.name,
                    guards: device.guards}
                };
        } else {
            return null;
        }
    }
});
