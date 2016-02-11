import DS from 'ember-data';

export default DS.Model.extend({
    dataIdentifier: DS.attr(),
    alarms: DS.hasMany("alarm")
});
