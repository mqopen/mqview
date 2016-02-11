import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    host: DS.attr(),
    port: DS.attr(),
    subscriptions: DS.attr(),
    publc: DS.attr()
});
