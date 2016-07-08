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
        var progress = this.get('progress');
        return [Math.round(progress)];
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

    dataArc: Ember.computed(function() {
        var xScale = this.get('xScale');
        var radius = this.get('radius');
        var pathWidht = this.get('pathWidht');
        return d3.svg.arc()
            .innerRadius(radius - pathWidht)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle((x) => xScale(x));
    }).readOnly(),

    backgroundArc: Ember.computed(function() {
        var radius = this.get('radius');
        var pathWidht = this.get('pathWidht');
        return d3.svg.arc()
            .innerRadius(radius - pathWidht)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(2 * Math.PI);
    }).readOnly(),

    call: function(selection) {
        var context = this;
        var width = this.get('contentWidth');
        var height = this.get('contentHeight');

        selection.attr('transform', `translate(${width / 2} ${height / 2 + this.get('margin.top')})`);
        selection.each(function() {
            context.radialProgress(d3.select(this));
            context.label(d3.select(this));
        });
    },

    radialProgress: join('progressData', 'path.radial-progress-data', {
        enter: function(selection) {
            var backgroundArc = this.get('backgroundArc');
            var dataArc = this.get('dataArc');

            selection.append('path')
                    .attr('class', 'radial-progress-bg')
                    .attr('d', backgroundArc)
                    .attr('fill', '#f0f0f0');


            selection.append('path')
                    .attr('class', 'radial-progress-data')
                    .attr('d', dataArc)
                    .each(function(d) {
                        this._current = 0;
                        this._arc = dataArc;
                    });
        },
        update: function(selection) {
            console.log("update");
            selection.transition()
                        .duration(300)
                        .attrTween('d', this.arcTween);
        },
    }),

    label: join('progressData', 'text', {
        enter: function(selection) {
            selection.append('text')
                        .style("text-anchor", "middle")
                        .text('0%')
                        .each(function(d) {
                            this._current = 0;
                        });
        },
        update: function(selection) {
            selection.transition()
                        .duration(300)
                        .tween('text', this.labelTween);
                        //.text((d) => d + '%');
        },
    }),

    arcTween: function(d, i, a) {
        var arc = this._arc;
        var interpolate = d3.interpolate(this._current, d);
        this._current = d;
        return function(t) {
            return arc(interpolate(t));
        };
    },

    labelTween: function(d, i, a) {
        var interpolate = d3.interpolateRound(this._current, d);
        this._current = d;
        return function(t) {
            this.textContent = interpolate(t) + "%";
        };
    },
});
