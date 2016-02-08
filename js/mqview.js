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

var devs = [];

var data = createData();

$(function() {
    var exampleSocket = new WebSocket("ws://localhost:8765/");
    exampleSocket.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        handleMsg(msg);
    }
});

function createData() {
    var data = {
        devices: [],
        brokers: []
    };
    return data;
}

function handleMsg(msg) {
    if (msg.feed == "init") {
        data = createData();
        data.devices = msg.devices;
    } else if (msg.feed == "update") {
    }
    updateTree();
    updateDeviceDetails();
}

function updateTree() {
    var devs = [];
    for (var i in data.devices) {
        var device = data.devices[i];
        devs.push({"text": device.name});
    }
    $('#device-tree').jstree({
        "core": {
            "data": [
                {"text": "General"},
                {
                    "text": "Devices",
                    "state" : {"opened" : true },
                    "children": devs
                },
                {"text": "Brokers"}]}});
}

function updateDeviceDetails() {
    $('#details').empty();
    for (var i in data.devices) {
        var device = data.devices[i];
        for (var j = 0; j < 3; j++) {
            $('#details').append($("<span>").loadTemplate($("#device-template"),
                {
                    device_name: device.name,
                    device_summary: "0/" + i
                }));
        }
    }
}
