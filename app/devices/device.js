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
    name: null,
    guards: [],
    presence: null,

    hasPresence: function() {
        return this.get('presence') !== null;
    },

    getGuard: function(dataIdentifier) {
        var guards = this.get('guards');
        for (var i = 0; i < guards.length; i++) {
            var guard = guards[i];
            if (dataIdentifier.equals(guard.dataIdentifier)) {
                return guard;
            }
        }
        return null;
    },

    isOk: function() {
        var presenceIsOk = true
        if (this.hasPresence()) {
            presenceIsOk = this.get('presence').isOk();
        }

        if (!presenceIsOk) {
            return false;
        }

        var guards = this.get('guards');
        for (var i = 0; i < guards.length; i++) {
            var guard = guards[i];
            if (!guard.isOk()) {
                return false;
            }
        }

        return true;
    },

    getStatus: function() {
        if (this.isOk()) {
            return "device-ok";
        } else {
            return "device-error";
        }
    },

    getGuardCount: function() {
        return this.get('guards').length;
    },

    getAlarmCount: function() {
        var guards = this.get('guards');
        var alarmCount = 0;
        for (var i = 0; i < guards.length; i++) {
            var guard = guards[i];
            alarmCount += guard.getAlarmCount();
        }
        return alarmCount;
    },
});
