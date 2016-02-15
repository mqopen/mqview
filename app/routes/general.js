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
            devices: this.getDevices(),
            brokers: this.getBrokers(),
            services: [],
        };
    },

    getDevices: function() {
        var devices = this.get('guardData').getDevices();
        var _d = [];
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            var status = "device-ok";
            if (device.status != "ok")
                status = "device-error"
            var guardCount = 0;
            var alarmCount = 0;
            for (var j = 0; j < device.guards.length; j++) {
                var guard = device.guards[j];
                guardCount++;
                alarmCount += guard.alarms.length;
            }
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
        var _b = [];
        for (var i = 0; i < brokers.length; i++) {
            var broker = brokers[i];
            _b.push(broker);
        }
        return _b;
    },
});
