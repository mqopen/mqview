import DS from 'ember-data';

export default DS.Model.extend({
    alarm: DS.attr(),
    guard: DS.attr(),
    status: DS.attr(),
    message: DS.attr()
});
