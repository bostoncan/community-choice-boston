/* global d3, topojson */
(function() {
  'use strict';

  function titleCase(name) {
    return name
        .split(' ')
        .map(function(n) {
            return n[0] + n.slice(1).toLowerCase();
        })
        .join(' ');
  }

  d3.json('/data/ma-towns.topojson', function(err, topology) {

    // Convert the topojson to geojson
    var geojson = topojson.feature(topology, topology.objects.towns),
        path = d3.geo.path().projection(null),
        townLookup = {},
        defaultTownContext = {
            ccaEstablished: 'Not yet',
            type: 0,
            ccaName: '-',
            renewables: '-'
        };

    d3.select('#map')
        .append('svg').attr({width: 615, height: 375})
        .append('g')
        .attr({'class': 'g-town'})
        .selectAll('path.town')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr({
            'class': function(d) {
                var cca = d.properties.cca || defaultTownContext;
                switch(cca.type) {
                    case 1:
                        return 'town town-green';
                    case 2:
                        return 'town town-orange';
                    default:
                        return 'town';
                }
            },
            'data-town': function(d) {
                townLookup[d.properties.town] = d.properties.cca;
                return d.properties.town;
            },
            d: path
        });
        $('.town').hover(function(el) {
            var town = $(el.currentTarget).data('town');
            $('#town-name').html(titleCase(town));
        }, function() {
            $('#town-name').html('');
        });

        /*
         * Map legend
         */
        var legendText = ['Participating in a CCA', 'Proposed', 'None yet'],
            color = d3.scale.ordinal().range(['#fff', 'orange', 'green']);
        color.domain([0,1,2]); // setting the range of the input data

        var legend = d3.select('#legend').append('svg')
            .attr('class', 'legend')
            .attr('width', 180)
            .attr('height', 60)
            .selectAll('g')
            .data(color.domain().slice().reverse())
            .enter()
            .append('g')
            .attr('transform', function(d, i) {
                return 'translate(0,' + i * 20 + ')';
            });

        legend.append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .style({stroke: 'gray', fill: color});

        legend.append('text')
            .data(legendText)
            .attr('x', 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .text(function(d) { return d; });
  });
}());
