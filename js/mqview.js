$(function() {
    var exampleSocket = new WebSocket("ws://localhost:8765/");
    var devs = [];
    exampleSocket.onmessage = function (event) {
        var msg = JSON.parse(event.data);
        if (msg.feed == "init") {
            for (var i in msg.devices) {
                var device = msg.devices[i];
                devs.push({"text": device.name});
                $('#container').append($("<div>").loadTemplate($("#device-template"),
                    {
                        device_name: device.name
                    }));
            }
            updateTree();
        }
    }

    function updateTree() {
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
});
