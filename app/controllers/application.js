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

export default Ember.Controller.extend({
    guardData: Ember.inject.service('guard-data'),
    websocket: Ember.inject.service('websockets'),

    init: function() {
        this._super(...arguments);
        var socket = this.get('websocket').socketFor('ws://localhost:8765/');
        socket.on('open', this.onSocketOpen, this);
        socket.on('message', this.onSocketMessage, this);
        socket.on('error', this.onSocketError, this);
        socket.on('close', function(event) {
            Ember.run.later(this, () => {
                socket.reconnect();
            }, 1000);
        }, this);
    },

    onSocketOpen: function(event) {
    },

    onSocketMessage: function(event) {
        var msg = JSON.parse(event.data);
        this.get('guardData').onData(msg);
    },

    onSocketError: function(event) {
    },
});
