import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    normalize(typeHash, hash) {
        return this._super(typeHash, hash);
    }
});
