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
    devices: null,
    brokers: null,
    deviceTransform: DeviceTransform.create(),

    stats: {
        devices: 0,
        guards: 0,
        alarms: 0,
        devicesInError: 0,
        guardsInError: 0,
        alarmsInError: 0,
    },

    init: function() {
        this._super(...arguments);
        this.set('devices', []);
        this.set('brokers', []);
        this._updateStats();
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

    getGuardReasons: function(deviceName, dataIdentifier) {
        var device = this.getDevice(deviceName);
        if (device === null) {
            return null;
        }
        var _r = [];
        for (var i = 0; i < device.reasons.guards.length; i++) {
            var reason = device.reasons.guards[i];
            if (this.areDataIdentifiersEquals(reason.guard, dataIdentifier)) {
                _r.push({
                    status: reason.status,
                    message: reason.message,
                    alarm: reason.alarm,
                });
            }
        }
        return _r;
    },

    areDataIdentifiersEquals: function(a, b) {
        return a.broker === b.broker && a.topic === b.topic;
    },

    getStatistics: function() {
        return this.get('stats');
    },

    _updateStats: function() {
        var devices = this.get('devices');
        var devicesCount = 0;
        var guardsCount = 0;
        var alarmsCount = 0;
        var devicesInErrorCount = 0;
        var guardsInErrorCount = 0;
        var alarmsInErrorCount = 0;
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            devicesCount++;
            if (device.status !== 'ok') {
                devicesInErrorCount++;
            }

            /* Guards. */
            for (var j = 0; j < device.guards.length; j++) {
                var guard = device.guards[j];
                guardsCount++;
                alarmsCount += guard.alarms.length;
            }

            /* Reasons. */
            if (device.reasons !== null && device.reasons.guards.length > 0) {
                guardsInErrorCount++;
                for (var j = 0; j < device.reasons.guards.length; j++) {
                    var reason = device.reasons.guards[j];
                    if (reason.status !== 'ok') {
                        alarmsInErrorCount++;
                    }
                }
            }
        }

        this.set('stats', {
            devices: devicesCount,
            guards: guardsCount,
            alarms: alarmsCount,
            devicesInError: devicesInErrorCount,
            guardsInError: guardsInErrorCount,
            alarmsInError: alarmsInErrorCount,
        });
    },

    getTestDevice: function() {
        return Device.create({});
    },
});
