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
        this.get('guardData').addStatisticsObserver(this, this.onStatisticsUpdate);
    },

    onStatisticsUpdate: function() {
        this.refresh();
    },

    model: function() {
        var statistics = this.get('guardData').getStatistics();
        return {
            hasData: statistics.hasData(),

            devicesOk: 100 / statistics.devicesTotal * statistics.devicesOk,
            guardsOk: 100 / statistics.guardsTotal * statistics.guardsOk,
            alarmsOK: 100 /statistics.alarmsTotal * statistics.alarmsOk,
            devicesOnline: 100 / statistics.presenceTotal * statistics.presenceOk,
            devicesUnknown: 0,
            total: 50,
        };
    }
});
