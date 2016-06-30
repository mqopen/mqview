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
    criteria: null,
    status: null,
    message: null,

    updateError: function(status, message) {
        this.set('status', status);
        this.set('message', message);
    },

    setOk: function() {
        this.set('status', 'ok');
        this.set('message', 'ok');
    },

    isOk: function() {
        return this.get('status') === 'ok';
    },
});
