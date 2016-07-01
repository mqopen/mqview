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

export default Ember.Component.extend({
    device: null,

    init: function() {
        this._super(...arguments);
    },

    presence: Ember.computed('device', function() {
        var device = this.get('device');
        if (!device) {
            return {
                hasPresence: false,
            };
        } else {
            var presence = device.presence;
            var isOk = presence.isOk();
            var status =  isOk ? "presence-ok" : "presence-error";
            return {
                hasPresence: true,
                topic: presence.dataIdentifier.topic,
                onlineMessage: presence.onlineMessage,
                offlineMessage: presence.offlineMessage,
                isOk: isOk,
                message: presence.message,
                status: status,
            };
        }
    }),
});
