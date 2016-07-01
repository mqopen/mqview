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
    guard: null,

    topic: Ember.computed('guard', function() {
        var guard = this.get('guard');
        if (!guard) {
            return {
                hasData: false,
            };
        } else {
            return {
                hasData: true,
                topic: guard.dataIdentifier.topic,
                alarms: this.getAlarms(guard.getAlarmsArray()),
                status: guard.isOk() ? "topic-ok" : "topic-error",
            };
        }
    }),

    getAlarms: function(alarms) {
        var _alarms = [];
        for (var i = 0; i < alarms.length; i++) {
            var alarm = alarms[i];
            _alarms.push(
                {
                    name: alarm.name,
                    criteria: alarm.criteria,
                    isOk: alarm.isOk(),
                    message: alarm.message,
                }
            );
        }
        return _alarms;
    },

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
