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

export default Ember.Service.extend({
    devices: null,
    brokers: null,
    init: function() {
        this._super(...arguments);
        this.set('devices', []);
        this.set('brokers', []);
    },

    initDevices: function(devices) {
        this.set('devices', devices);
    },

    initBrokers: function(brokers) {
        this.set('brokers', brokers);
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

    getDevice: function(name) {
        var devices = this.get('devices');
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            if (device.name == name) {
                return device;
            }
        }
        return null;
    }
});
