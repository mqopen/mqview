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

export default Ember.Route.extend({
    guardData: Ember.inject.service('guard-data'),

    init: function() {
        this._super(...arguments);
        this.get('guardData').addDeviceObserver(this, this.onDataChange);
        this.get('guardData').addBrokerObserver(this, this.onDataChange);
    },

    onDataChange: function(sender, key, value, rev) {
        this.refresh();
    },

    model: function() {
        return {
            devs: this.get('guardData').getDevices(),
            devices: this.getDevices(),
            brokers: this.getBrokers(),
            services: [],
        };
    },

    getDevices: function() {
        var devices = this.get('guardData').getDevices();
        var deviceNames = Object.keys(devices);
        var _d = [];
        for (var i = 0; i < deviceNames.length; i++) {
            var device = devices[deviceNames[i]];
            var status = device.getStatus();
            var guardCount = device.getGuardCount();
            var alarmCount = device.getAlarmCount();
            _d.push(
                {
                    name: device.name,
                    guardCount: guardCount,
                    alarmCount: alarmCount,
                    status: status,
                });
        }
        return _d;
    },

    getBrokers: function() {
        var brokers = this.get('guardData').getBrokers();
        var brokerNames = Object.keys(brokers);
        var _b = [];
        for (var i = 0; i < brokerNames.length; i++) {
            var broker = brokers[brokerNames[i]];
            _b.push(broker.name);
        }
        return _b;
    },
});
