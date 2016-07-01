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
    dataIdentifier: null,
    alarms: {},

    getAlarmsArray: function() {
        var alarmDict = this.get('alarms');
        var alarmNames = Object.keys(alarmDict);
        var alarms = [];
        for (var i = 0; i < alarmNames.length; i++) {
            var alarm = alarmDict[alarmNames[i]];
            alarms.push(alarm);
        }
        return alarms;
    },

    getAlarmCount: function() {
        var alarms = this.get('alarms');
        return Object.keys(alarms).length;
    },

    isOk: function() {
        var alarms = this.get('alarms');
        var alarmNames = Object.keys(alarms);
        for (var i = 0; i < alarmNames.length; i++) {
            var alarm = alarms[alarmNames[i]];
            if (!alarm.isOk()) {
                return false;
            }
        }
        return true;
    },
});
