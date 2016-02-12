import Ember from 'ember';

export default Ember.Controller.extend({
    guardData: Ember.inject.service('guard-data'),
    devices: null,
    init: function() {
        this._super(...arguments);
        this.get('guardData').addDeviceObserver(this,
            function(sender, key, value, rev) {
                this.set('devices', this.get('guardData').getDevices());
            });
    }
});
