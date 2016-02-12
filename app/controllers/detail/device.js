import Ember from 'ember';

export default Ember.Controller.extend({
    deviceName: null,
    guards: null,
    init: function() {
        this._super(...arguments);
    },
});
