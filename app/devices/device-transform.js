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
import Alarm from '../devices/alarm';
import Broker from '../devices/broker';
import DataIdentifier from '../devices/data-identifier';
import Device from '../devices/device';
import Guard from '../devices/guard';
import Presence from '../devices/presence';


export default Ember.Object.extend({

    /**
     * Get mapping of device objects.
     *
     * @param inputJSON Input JSON object.
     */
    getDevices: function(inputJSON) {
        var devices = {};
        for (var i = 0; i < inputJSON.length; i++) {
            var device = inputJSON[i];

            var name = device.name;
            var guards = this.parseGuards(device.guards);
            var presence = this.parsePresence(device.presence);

            devices[name] = Device.create(
                {
                    name: name,
                    guards: guards,
                    presence: presence,
                }
            );
        }

        this.applyReasons(devices, inputJSON)
        return devices;
    },

    getBrokers: function(inputJSON) {
        var brokers = {};

        for (var i = 0; i < inputJSON.length; i++) {
            var broker = inputJSON[i];

            var name = broker.name;
            var host = broker.host;
            var port = broker.port;
            var isPublic = broker.public;
            var subscriptions = broker.subscriptions;

            brokers[name] = Broker.create(
                {
                    name: name,
                    host: host,
                    port: port,
                    isPublic: isPublic,
                    subscriptions: subscriptions,
                }
            );
        }

        return brokers;
    },

    /**
     * Apply reasons to device objects.
     */
    applyReasons: function(devices, inputJSON) {
        for (var i = 0; i < inputJSON.length; i++) {
            var reason = inputJSON[i].reasons;
            var device = devices[inputJSON[i].name]
            this.applyPresence(device, reason.presence);
            this.applyGuards(device, reason.guards);
        }
    },

    parsePresence: function(presence) {
        if (presence.isEnabled) {
            var presenceDataIdentifier = this.parseDataIdentifier(presence.dataIdentifier);
            var onlineMessage = presence.onlineMessage;
            var offlineMessage = presence.offlineMessage;

            var p = Presence.create(
                {
                    dataIdentifier: presenceDataIdentifier,
                    onlineMessage: onlineMessage,
                    offlineMessage: offlineMessage,
                }
            );
            p.setOk();

            return p;
        } else {
            return null;
        }
    },

    parseGuards: function(guards) {
        var _guards = [];
        for (var i = 0; i < guards.length; i++) {
            var guard = guards[i];

            var dataIdentifier = this.parseDataIdentifier(guard.dataIdentifier);
            var alarms = this.parseAlarms(guard.alarms);

            _guards.push(Guard.create(
                {
                    dataIdentifier: dataIdentifier,
                    alarms: alarms,
                }
            ));

        }
        return _guards;
    },

    parseAlarms: function(alarms) {
        var _alams = {};
        for (var i = 0; i < alarms.length; i++) {
            var alarm = alarms[i];

            var name = alarm.alarm;
            var criteria = alarm.criteria;

            var a = Alarm.create(
                {
                    name: name,
                    criteria: criteria,
                }
            );
            a.setOk();

            _alams[name] = a;
        }
        return _alams;
    },

    applyPresence: function(device, presenceReason) {
        var presence = device.presence;
        if (presenceReason) {
            presence.updateError(presenceReason.status, presenceReason.message);
        }
    },

    applyGuards: function(device, guardReasons) {
        for (var i = 0; i < guardReasons.length; i++) {
            var guardReason = guardReasons[i];
            var guardDataIdentifier = this.parseDataIdentifier(guardReason.guard)
            var guard = device.getGuard(guardDataIdentifier);
            var alarm = guard.alarms[guardReason.alarm];

            if (guardReason.status === 'ok') {
                alarm.setOk();
            } else {
                alarm.updateError(guardReason.status, guardReason.message);
            }
        }
    },

    parseDataIdentifier: function(dataIdentifier) {
        return DataIdentifier.create(
            {
                brokerName: dataIdentifier.broker,
                topic: dataIdentifier.topic,
            }
        );
    },
});
