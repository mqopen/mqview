export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
    name: 'websocket',
    initialize: function(application) {
        application.inject('controller', 'websockets', 'service:websockets');
    }
};
