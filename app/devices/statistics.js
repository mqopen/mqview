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

export default Ember.Object.extend({
    devicesOk: null,
    devicesTotal: null,
    guardsOk: null,
    guardsTotal: null,
    alarmsOk: null,
    alarmsTotal: null,
    presenceOk: null,
    presenceTotal: null,

    hasData: function() {
        return this.get('devicesTotal') !== null;
    },

    update: function(devices) {
        var deviceNames = Object.keys(devices);

        var devicesOk = 0;
        var devicesTotal = deviceNames.length;
        var guardsOk = 0;
        var guardsTotal = 0;
        var alarmsOk = 0;
        var alarmsTotal = 0;
        var presenceOk = 0;
        var presenceTotal = 0;

        for (var i = 0; i < deviceNames.length; i++) {
            var device = devices[deviceNames[i]];

            if (device.isOk()) {
                devicesOk++;
            }

            if (device.hasPresence()) {
                presenceTotal++;
                if (device.presence.isOk()) {
                    presenceOk++;
                }
            }

            for (var j = 0; j < device.guards.length; j++) {
                var guard = device.guards[j];

                guardsTotal++;
                if (guard.isOk()) {
                    guardsOk++;
                }

                var alarmNames = Object.keys(guard.alarms);
                alarmsTotal += alarmNames.length;
                for (var k = 0; k < alarmNames.length; k++) {
                    var alarm = guard.alarms[alarmNames[k]];
                    if (alarm.isOk()) {
                        alarmsOk++;
                    }
                }
            }
        }

        this.set('devicesOk', devicesOk);
        this.set('devicesTotal', devicesTotal);
        this.set('guardsOk', guardsOk);
        this.set('guardsTotal', guardsTotal);
        this.set('alarmsOk', alarmsOk);
        this.set('alarmsTotal', alarmsTotal);
        this.set('presenceOk', presenceOk);
        this.set('presenceTotal', presenceTotal);
    },
});
