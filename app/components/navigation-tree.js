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
    data: null,
    theme: {
        dots: false,
    },

    init: function() {
        this._super(...arguments);
        this.set('data', this.getTreeBaseData());
        var guardData = this.get('guardData');
        guardData.addDeviceObserver(this, 'updateTree');
    },

    updateTree: function(sender, key, value, rev) {
        var tData = this.getTreeBaseData();
        var devices = this.get('guardData').getDevices();
        var deviceNames = Object.keys(devices);
        for (var i = 0; i < deviceNames.length; i++) {
            tData[1].children.push(
                {
                    text: deviceNames[i],
                    icon: "glyphicon glyphicon-tasks",
                    li_attr: {
                        class: "device-node"
                    }
                });
        }
        this.set('data', tData);
    },

    getTreeBaseData: function() {
        return [
            {
                text: 'General',
                icon: 'glyphicon glyphicon-th',
                state: {
                    selected: true
                },
                li_attr: {
                    class: 'tree-general'
                }
            },
            {
                text: 'Devices',
                icon: 'glyphicon glyphicon-arrow-right',
                state: {
                    opened: true
                },
                children: []
            },
            {
                text: 'Brokers',
                icon: 'glyphicon glyphicon-arrow-right',
                state: {
                    opened: true
                },
                children: []
            }
        ];
    },

    actions: {
        nodeClicked: function(e, data, a) {
            if (e.li_attr.class === "tree-general") {
                this.get('router').transitionTo("general");
            } else if (e.li_attr.class === 'device-node') {
                this.get('router').transitionTo("detail.device", e.text);
            }
        },
    },
});
