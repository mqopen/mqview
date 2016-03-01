import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    actions: {
        onClick : function() {
            this.sendAction('onClick', this.get('broker').name);
        },
    },
});
