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
    duration: 1000,
    margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    width: 200,
    height: 200,
    diameter: 0,
    bound: {
        min: 0,
        max: 100
    },
    step: Math.PI * 2 / 100,
    progress: 0,

    progressData: Ember.computed('progress', function() {
        return [this.get('progress')];
    }),

    radius: Ember.computed('width', 'height', function() {
        return Math.max(this.get('width'), this.get('height')) / 2;
    }),

    arcGenerator: Ember.computed(function() {
        return d3.svg.arc()
            .innerRadius(this.get('radius')/2 - 20)
            .outerRadius(this.get('radius')/2)
            .startAngle(0)
            .endAngle((x) => this.get('step') * x);
    }),

    call: function(selection) {
        selection.attr('transform', 'translate(0,0)');
        this.drawBackground(selection);
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

    drawBackground: function(selection) {
    },

    drawProgress: function(selection) {
        var arc = this.get('arcGenerator');
        selection.append("g")
                .append("path")
                    .attr("transform", this.getTranslation())
                    .attr("d", arc);
    },

    drawLabel: function(selection) {
        selection.append('text')
            .text(function (d){return d;});
    },

    getTranslation: function() {
        return "translate(" + this.get('width')/2 + "," + this.get('radius')/2+20 + ")";
    },
});
