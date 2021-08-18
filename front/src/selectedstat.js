import React, { Component } from 'react';
import axios from 'axios';
const d3 = require('d3');

class SelectedStat extends Component {
    constructor(props) {
        super(props);
        this.width = props.size[0];
        this.height = props.size[1];
        this.margin = {top: 20, bottom: 20, left: 20, right: 20};
        this.labelHeight = 40
        console.log(props.trigger)
    }

    componentDidUpdate() {
        if (this.props.trigger === 1) {
            this.datarequest =
                axios
                    .get('http://localhost:5000/get_selected')
                    .then(response => {
                        this.data = response.data
                        d3.select(this.node).selectAll('*').remove();
                        this.createSelectedStat();
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
            min_freq: 0,
            max_freq: 0,
            min_sum: 0,
            max_sum: 0,
            min_cov: 0,
            max_cov: 0
        };

        stat.target_count = this.data.length;
        for (let i = 0; i < stat.target_count; i++) {
            stat.avg_freq += this.data[i].count;
        }
        stat.avg_freq = stat.avg_freq / stat.target_count;

        return stat
    }

    createSelectedStat() {
        const node = this.node;
        const svg = d3.select(node);
        const stat = this.getOverallStat();

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
