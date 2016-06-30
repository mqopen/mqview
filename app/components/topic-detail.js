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
    guardData: Ember.inject.service('guard-data'),
    deviceName: null,

    topic: Ember.computed('deviceName', function() {
        var deviceName = this.get('deviceName');
        var device = this.get('guardData').getDevice(deviceName);
        if (!device) {
            return {
            };
        } else {
            return {
            };
        }
    }),

    actions: {
        topicDetail: function(topic, alarm) {
            console.log('topic detail clicked: ' + topic + ' ' + alarm);
            this.sendAction('topicDetail', this.convertTopic(topic), alarm);
        },
    },

    convertTopic: function(topic) {
        return topic.replace(/\//g, '.');
    },
});
