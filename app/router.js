import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('general');
  this.route('detail', function() {
    this.route('device', {path: '/device/:name'});
  });
});

export default Router;
