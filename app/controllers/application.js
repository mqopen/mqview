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
    treeData: null,
    init: function() {
        this._super();
        var socket = this.get('websockets').socketFor('ws://localhost:8765/');
        socket.on('open', this.myOpenHandler, this);
        socket.on('message', this.onMessage, this);
        socket.on('close', function(event) {
            console.log('closed');
        }, this);
        this.get('guardData').addDeviceObserver(this, 'updateTree');
        this.set('treeData', this.getTreeBaseData());
    },

    myOpenHandler: function(event) {
        console.log('On open event has been called: ' + event);
    },

    onMessage: function(event) {
        var msg = JSON.parse(event.data);
        if (msg.feed == "init") {
            this.get('guardData').initDevices(msg.devices);
            this.get('guardData').initBrokers(msg.brokers);
        } else if (msg.feed == "update") {
        }
    },

    updateTree: function(sender, key, value, rev) {
        var tData = this.getTreeBaseData();
        var devices = this.get('guardData').getDevices();;
        var deviceList = []
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            tData[1].children.push(
                {
                    text: device.name,
                    a_attr: {
                        href: "detail/device/" + device.name
                    },
                    li_attr: {
                        class: "device-node"
                    }
                });
        }
        this.set('treeData', tData);
    },

    getTreeBaseData: function() {
        return [
            {
                text: "General",
                state: {
                    selected: true
                },
                li_attr: {
                    class: "tree-general"
                }
            },
            {
                text: "Devices",
                state: {
                    opened: true
                },
                children: []
            },
            {
                text: "Brokers",
                state: {
                    opened: true
                },
                children: []
            }
        ];
    },

    actions: {
        handleTreeDidBecomeReady: function() {
            var treeObject = this.get('jstreeObject');
            treeObject.on('select_node.jstree', function(e, data) {
                if (data.node.li_attr.class == "tree-general") {
                    this.transitionToRoute("general");
                } else if (data.node.li_attr.class == "device-node") {
                    this.transitionToRoute("detail.device", data.node.text);
                }
            }.bind(this));
        },
    },
});
