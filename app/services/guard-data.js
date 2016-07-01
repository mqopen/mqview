/**
 * Copyright (C) Ivo Slanina <ivo.slanina@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Ember from 'ember';
import Device from '../devices/device';
import DeviceTransform from '../devices/device-transform';

export default Ember.Service.extend({
    devices: {},
    brokers: {},
    deviceTransform: DeviceTransform.create(),

    init: function() {
        this._super(...arguments);
    },

    onData: function(inputJSON) {
        if (inputJSON.feed == 'init') {
            var devices = this.get('deviceTransform').getDevices(inputJSON.devices)
            var brokers = this.get('deviceTransform').getBrokers(inputJSON.brokers)

            this.set('devices', devices);
            this.set('brokers', brokers);
        } else if (inputJSON.feed == 'update') {
            var devices = this.get('devices')
            for (var i = 0; i < inputJSON.devices.length; i++) {
                var device = inputJSON.devices[i]
                this.get('deviceTransform').applyReasons(devices, device.reasons);
            }
        }
    },

    getDevices: function() {
        return this.get('devices');
    },

    getBrokers: function() {
        return this.get('brokers');
    },

    addDeviceObserver: function(target, method) {
        this.addObserver('devices', target, method);
    },

    addBrokerObserver: function(target, method) {
        this.addObserver('brokers', target, method);
    },

    getDevice: function(name) {
        return this.get('devices')[name];
    },

    getBroker: function(name) {
        return this.get('brokers')[name];
    },

});
