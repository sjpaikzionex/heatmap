import React, { Component } from 'react';
import axios from 'axios';
import d3Tip from 'd3-tip';
const d3 = require('d3');

class SelectedStat extends Component {
    constructor(props) {
        super(props);
        this.width = props.size[0];
        this.height = props.size[1];
        this.margin = {top: 20, bottom: 20, left: 20, right: 20};
        this.labelHeight = 40
    }

    componentDidUpdate() {
        if (this.props.trigger === 1) {
            this.datarequest =
                axios
                    .get('http://localhost:5000/get_selected')
                    .then(response => {
                        this.data = response.data
                        d3.select(this.node).selectAll('*').remove();
                        this.createSelectedStat_pie();
                    })
                    .catch(error => {
                        console.log(error)
                    });
        }
    }

    getOverallStat() {
        let stat = {
            target_count: 0,
            avg_freq: 0,
            min_freq: Number.MAX_VALUE,
            max_freq: 0,
            min_sum: Number.MAX_VALUE,
            max_sum: 0,
            min_cov: Number.MAX_VALUE,
            max_cov: 0
        };

        stat.target_count = this.data.length;
        for (let i = 0; i < stat.target_count; i++) {
            stat.avg_freq += this.data[i].count;
            stat.max_freq = (stat.max_freq > this.data[i].count) ? stat.max_freq : this.data[i].count;
            stat.min_freq = (stat.min_freq < this.data[i].count) ? stat.min_freq : this.data[i].count;
            stat.max_sum = (stat.max_sum > this.data[i].sum) ? stat.max_sum : this.data[i].sum;
            stat.min_sum = (stat.min_sum < this.data[i].sum) ? stat.min_sum : this.data[i].sum;
            stat.max_cov = (stat.max_cov > this.data[i].cov) ? stat.max_cov : this.data[i].cov;
            stat.min_cov = (stat.min_cov < this.data[i].cov) ? stat.min_cov : this.data[i].cov;
        }
        stat.avg_freq = stat.avg_freq / stat.target_count;

        return stat
    }

    createSelectedStat_hist() {
        const node = this.node;
        const svg = d3.select(node).append('svg').attr('id', 'sel-hist');
        const stat = this.getOverallStat();

        // Select Summary
        svg
            .append('g')
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
            .append('text')
                .text('# Selected: ' + stat.target_count)
                .style('font-family', 'Calibri')
                .style("text-anchor", "center")
                .style("fill", "#000");

        svg
            .append('g')
                .attr("transform", `translate(${(this.width - this.margin.left - this.margin.right) / 3 + this.margin.left}, ${this.margin.top})`)
            .append('text')
                .text('Avg Freq: ' + parseInt(stat.avg_freq))
                .style('font-family', 'Calibri')
                .style("text-anchor", "center")
                .style("fill", "#000");

        // Freq Histogram
        var bins = d3
            .bin()
            .value(d => d.count)
            .thresholds(20)(this.data);

        const x_scale = d3
            .scaleLinear()
            .domain([bins[0].x0, bins[bins.length - 1].x1])
            .range([this.margin.left, this.width - this.margin.right]);

        const y_scale = d3
            .scaleLinear()
            .domain([0, d3.max(bins, d => d.length)]).nice()
            .range([this.height - this.margin.bottom, this.margin.top + this.labelHeight]);

        svg
            .append('g')
            .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
            .call(d3.axisBottom(x_scale).tickSize(0))
            .call(g => g.select(".domain").remove())
            .selectAll("text")
                .attr("y", 7)
                .style("fill", "#777");

        svg
            .append('g')
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .call(d3.axisLeft(y_scale).tickSize(0))
            .call(g => g.select(".domain").remove())
            .selectAll("text")
                // .attr("y", 7)
                .style("text-anchor", "center")
                .style("fill", "#777");

        svg
            .append('g')
                .attr('fill', 'steelblue')
            .selectAll('rect')
            .data(bins)
            .join('rect')
                .attr('x', d => x_scale(d.x0) + 1)
                .attr('width', d => Math.max(0, x_scale(d.x1) - x_scale(d.x0) - 1))
                .attr('y', d => y_scale(d.length))
                .attr('height', d => y_scale(0) - y_scale(d.length));
    }

    createSelectedStat_pie() {
        const node = this.node;
        const svg = d3.select(node).append('svg').attr('id', 'sel-pie');
        const stat = this.getOverallStat();
        const r = (this.width - this.margin.left - this.margin.right) / 2;

        // Select Summary
        svg
            .append('g')
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
            .append('text')
                .text('# Selected: ' + stat.target_count)
                .style('font-family', 'Calibri')
                .style("text-anchor", "center")
                .style("fill", "#000");

        svg
            .append('g')
                .attr("transform", `translate(${(this.width - this.margin.left - this.margin.right) / 3 + this.margin.left}, ${this.margin.top})`)
            .append('text')
                .text('Avg Freq: ' + parseInt(stat.avg_freq))
                .style('font-family', 'Calibri')
                .style("text-anchor", "center")
                .style("fill", "#000");

        const graph = svg
            .append('g')
            .attr('transform', `translate(${(this.width - this.margin.left - this.margin.right) / 2 + this.margin.left}, ${this.height / 2 + this.margin.top})`)

        var bins = d3
            .bin()
            .value(d => d.count)
            .thresholds(5)(this.data);

        const pie = d3
            .pie()
            .sort(d => d.index)
            .value(d => d.length);

        // console.log(bins)
        // console.log(pie(bins))

        const piedat = pie(bins);

        const color = d3
            .scaleSequential(d3.interpolateBlues)
            .domain([0, d3.max(piedat, d => {return d.value})]);

        const arc = d3
            .arc()
            .outerRadius(r)
            .innerRadius(0)

        let tip = graph
            .append('text')
                .style('position', 'absolute')
                .style('visibility', 'visible')
                .text('text');

        graph
            .selectAll()
            .data(piedat)
            .enter()
            .append('path')
                .attr('id', d => {console.log(d); return 'arcpath' + d.index})
                .attr('d', arc)
                .attr('fill', d => {return color(d.value)})
                .attr('fill-opacity', 0.5)
                .style('stroke', 'black')
                .on("mouseover", () => {return tip.style("visibility", "visible");})
                .on("mousemove", (e) => {console.log(e); return tip.style("top", (e.pageY)+"px").style("left",(e.pageX)+"px");})
                .on("mouseout", function(){return tip.style("visibility", "hidden");});

        // for (let i = 0; i < piedat.length; i++) {
        //     const text = graph
        //         .append('text')
        //             .attr('x', 6)
        //             .attr('dy', -5)
        //     text
        //         .append('textPath')
        //         .attr('xlink:href', '#arcpath' + piedat[i].index)
        //         .text(piedat[i].value)
        // }

    }

    render() {
        return (
            <svg
                ref={(node) => {this.node = node}}
                id={'selectstat'}
                width={this.width}
                height={this.height}
            >
            </svg>
        );
    }
}

export default SelectedStat;
