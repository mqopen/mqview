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
import MarginConvention from 'ember-cli-d3/mixins/margin-convention';
import { join } from 'ember-cli-d3/utils/d3';

export default Ember.Component.extend(GraphicSupport, MarginConvention, {
    duration: 1000,
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    width: 300,
    height: 300,
    diameter: 0,
    pathWidht: 20,
    bound: {
        min: 0,
        max: 100
    },
    progress: 0,

    progressData: Ember.computed('progress', function() {
        return [Math.round(this.get('progress'))];
    }),

    diameter: Ember.computed('width', 'height', function() {
        return Math.min(this.get('width'), this.get('height'));
    }).readOnly(),

    radius: Ember.computed('diameter', function() {
        return this.get('diameter') / 2;
    }).readOnly(),

    xScale: Ember.computed(function() {
        return d3.scale.linear()
            .domain([0, 100])
            .range([0, 2 * Math.PI]);
    }).readOnly(),

    arcGenerator: Ember.computed(function() {
        var xScale = this.get('xScale');
        var radius = this.get('radius');
        var pathWidht = this.get('pathWidht');
        return d3.svg.arc()
            .innerRadius(radius - pathWidht)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle((x) => xScale(x));
    }),

    call: function(selection) {
        var width = this.get('contentWidth');
        var height = this.get('contentHeight');
        selection.attr('transform', `translate(${width / 2} ${height / 2 + this.get('margin.top')})`);
        this.innerLayer(selection);
    },

    innerLayer: join('progressData', '.path', {
        update: function(selection) {
        },
        enter: function(selection) {
            this.drawProgress(selection);
            this.drawLabel(selection);
        },
        exit: function(selection) {
        }
    }),

    drawProgress: function(selection) {
        var arc = this.get('arcGenerator');
        selection.append('g')
                .append('path')
                    .attr('d', arc);
    },

    drawLabel: function(selection) {
        selection.append('g')
            .append('text')
                .style("text-anchor", "middle")
                .text((d) => d + '%');
    },
});
