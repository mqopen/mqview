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
import d3 from 'd3';
import GraphicSupport from 'ember-cli-d3/mixins/d3-support';
import { join } from 'ember-cli-d3/utils/d3';

export default Ember.Component.extend(GraphicSupport, {
    width: 200,
    height: 200,
    x: null,
    y: null,
    xAxis: null,
    yAxis: null,

    init: function() {
        this._super(...arguments);
        var x = d3.scale.linear()
            .range([0, this.get('width')]);
        var y = d3.scale.linear()
            .range([this.get('height'), 0]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');
        this.set('x', x);
        this.set('y', y);
        this.set('xAxis', xAxis);
        this.set('yAxis', yAxis);
    },

    call: function(selection) {
        var svg = selection.append("svg");
        svg.append("g")
            .attr("class", "x axis")
            //.attr("transform", "translate(0," + this.get('height') + ")")
            .attr("transform", "translate(0," + 100 + ")")
            .call(this.get('xAxis'));
        svg.append("g")
            .attr("class", "y axis")
            .call(this.get('yAxis'))
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Price ($)");
        this.drawData(svg);
    },

    drawData: join([1,2,3,4,5,6,7,8,9], 'a', {
        enter: function(selection) {
        }
    })
});
