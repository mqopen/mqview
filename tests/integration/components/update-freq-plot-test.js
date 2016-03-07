import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('update-freq-plot', 'Integration | Component | update freq plot', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{update-freq-plot}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#update-freq-plot}}
      template block text
    {{/update-freq-plot}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
