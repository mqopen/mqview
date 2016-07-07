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
            devicesOk: this.calulatePercentage(statistics.devicesTotal, statistics.devicesOk),
            guardsOk: this.calulatePercentage(statistics.guardsTotal, statistics.guardsOk),
            alarmsOk: this.calulatePercentage(statistics.alarmsTotal, statistics.alarmsOk),
            devicesOnline: this.calulatePercentage(statistics.presenceTotal, statistics.presenceOk),
            devicesUnknown: 10,
            total: Math.random() * 100,
        };
    },

    calulatePercentage: function(factor, multiplier) {
        var percentage = 100 / factor * multiplier;
        if (isNaN(percentage)) {
            percentage = 0;
        }
        return percentage;
    },
});
