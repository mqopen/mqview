import Ember from 'ember';

var devices = [
    {
        state: "device-error",
        name: "Test Name",
        guardsCount: 5,
        alarmsCount: 8
    },
    {
        state: "device-ok",
        name: "Test Name",
        guardsCount: 5,
        alarmsCount: 8
    },
    {
        state: "device-ok",
        name: "Test Name",
        guardsCount: 5,
        alarmsCount: 8
    },
    {
        state: "device-error",
        name: "Test Name",
        guardsCount: 5,
        alarmsCount: 8
    },
    {
        state: "device-error",
        name: "Test Name",
        guardsCount: 5,
        alarmsCount: 8
    },
    {
        state: "device-ok",
        name: "Test Name",
        guardsCount: 5,
        alarmsCount: 8
    },
    {
        state: "device-error",
        name: "Test Name",
        guardsCount: 5,
        alarmsCount: 8
    }
];

export default Ember.Route.extend({
    model() {
        return devices;
    },
});
