import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    description: DS.attr(),
    status: DS.attr(),
    guards: DS.hasMany("guard"),
    reasons: DS.hasMany("reason")
});
