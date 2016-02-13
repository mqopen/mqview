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
        this.get('guardData').addDeviceObserver(this, function(sender, key, value, rev) {
            this.refresh();
        });
    },
    model: function(params) {
        return this.getDevice(params.name);
    },

    getDevice: function(name) {
        var device = this.get('guardData').getDevice(name);
        var _d = null;
        if (device) {
            var guards = [];
            for (var i = 0; i < device.guards.length; i++) {
                var guard = device.guards[i];
                var di = guard.dataIdentifier;
                var guardStatus = 'topic-ok';
                var reasons = this.getGuardReasons(device, di);
                var alarms = [];
                for (var j = 0; j < guard.alarms.length; j++) {
                    var alarm = guard.alarms[j];
                    var alarmReason = this.getAlarmReason(reasons, alarm);
                    var isOK = (alarmReason.status == 'ok');
                    if (!isOK)
                        guardStatus = 'topic-error';
                    alarms.push({
                        name: alarm.alarm,
                        isOK: isOK,
                        status: alarmReason.status,
                        message: alarmReason.message,
                    });
                }
                guards.push({
                    topic: this.parseDataIdentifier(di).topic,
                    status: guardStatus,
                    alarms: alarms,
                });
            }

            _d = {
                name: device.name,
                description: device.description,
                guards: guards,
            };
        }
        return _d;
    },

    parseDataIdentifier: function(dataidentifier) {
        var res = dataidentifier.split(':');
        return {
            broker: res[0],
            topic: res[1],
        };
    },

    getGuardReasons: function(device, dataIdentifier) {
        var _r = [];
        if (device.reasons) {
            for (var i = 0; i < device.reasons.length; i++) {
                var reason = device.reasons[i];
                if (reason.guard == dataIdentifier) {
                    _r.push({
                        status: reason.status,
                        message: reason.message,
                        alarm: reason.alarm,
                    });
                }
            }
        }
        return _r;
    },

    getAlarmReason: function(reasons, alarm) {
        var _status = 'ok';
        var _message = 'ok';
        for (var i = 0; i < reasons.length; i++) {
            var reason = reasons[i];
            if (reason.alarm == alarm.alarm) {
                _status = reason.status;
                _message = reason.message;
            }
        }
        return {
            status: _status,
            message: _message,
        };
    },
});
