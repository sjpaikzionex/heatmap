import React, { Component } from 'react';
import d3Tip from 'd3-tip';
import axios from 'axios'

const d3 = require('d3')


class HeatMap extends Component {
    constructor(props) {
        super(props)
        // this.data = props.data
        this.width = props.size[0]
        this.height = props.size[1]
        this.createHeatMap.bind(this);
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/')
            .then(response => {
                console.log('load success');
                this.data = response.data
                this.x_label = Object.keys(this.data[0]).slice(1, );
                this.y_label = Array.from(new Set(d3.map(this.data, d => d.qty_pct)));
                this.chart_dat = this.process_data(this.data);
                this.margin = ({ top: 20, left: 20, right: 20, bottom: 80 });
                this.y_scale = d3
                    .scaleBand()
                    .domain(this.y_label)
                    .range([this.height - this.margin.bottom - this.margin.top, 0]);
                this.x_scale = d3
                    .scaleBand()
                    .domain(this.x_label)
                    .range([0, this.width - this.margin.left - this.margin.right]);
                this.color_scale = d3
                    .scaleSequential(d3.interpolateOrRd)
                    .domain([0, d3.max(this.chart_dat, d => d.sub_count)]);

                this.valRange = [0, d3.max(this.chart_dat, d => d.sub_count)]
                this.legendBins = [...Array(9).keys()].map(x => d3.quantile(this.valRange, x * 0.1))
                this.legendHeight = 20
                this.legendElementWidth = 56
                this.createHeatMap();
            })
            .catch(error => {
                console.log(error)
            });

    }

    componentDidUpdate() {
        this.createHeatMap();
    }

    process_data = (grp_dat) => {
        let ra = Array(grp_dat.length * this.x_label.length)

        for (let i = 0; i < ra.length; i += this.x_label.length) {
            for (let j = 0; j < this.x_label.length; j++) {
                ra[i + j] = {
                    qty_pct: grp_dat[parseInt(i / this.x_label.length)].qty_pct,
                    cov_lbl: this.x_label[j],
                    sub_count: grp_dat[parseInt(i / this.x_label.length)][this.x_label[j]]
                }
            }
        }

        return ra;
    }

    createHeatMap() {
        const node = this.node
        const svg = d3.select(node)

        svg
            .append('g')
                .attr("transform", `translate(${this.margin.left}, 0)`)
                .call(d3.axisBottom(this.x_scale).tickSize(0))
                .call(g => g.select(".domain").remove())
                .selectAll("text")
                // .attr("y", 5)
                    .style("text-anchor", "center")
                    .style("fill", "#777");

        svg
            .append('g')
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
                .call(d3.axisLeft(this.y_scale).tickSize(0).tickPadding(7))
                .call(g => g.select(".domain").remove())
                .selectAll("text")
                    .style("fill", "#777");

        svg
            .selectAll('g')
            .data(this.chart_dat)
            .enter()
                .append('g')
                .attr("transform", d => `translate(0,${this.y_scale(d.qty_pct) + 1})`);

        const tip = d3Tip()
            .attr('class', 'd3-tip')
            .offset([3, 0])
            .direction('s')
            .style('font-family', 'Calibri')
            .style('line-height', 1.2)
            .style('font-size', '15px')
            .style("background-color", d3.rgb(0, 0, 0, 0.7))
            .style("color", 'white')
            .style("border", "None")
            .style("border-width", "1px")
            .style("border-radius", "2px")
            .style("padding", "7px")
            .style('stroke', 'black')
            .html((e, d) => {
                return `qty : ${d.qty_pct}<br>cov : ${d.cov_lbl}<br>count : ${d.sub_count}`
            });
        svg.call(tip);

        svg.selectAll()
            .data(this.chart_dat)
            .enter()
            .append('rect')
                .attr('id', 'heatbox')
                .attr('x', d => this.x_scale(d.cov_lbl) + this.margin.left)
                .attr('y', d => this.y_scale(d.qty_pct) + this.margin.top)
                .attr('rx', 2)
                .attr('ry', 2)
                .attr('width', this.x_scale.bandwidth())
                .attr('height', this.y_scale.bandwidth())
                .attr('fill', d => this.color_scale(d.sub_count))
                .style('stroke', 'white')
                .style('fill-opacity', 0.7)
                .on('mouseover', tip.show)
                .on('mousemove', (d) => {this.highlight(d, this);})
                .on('mouseleave', (d) => {this.unhighlight(d, this);})
                .on('mouseout' , tip.hide)
                .on('click', () => {d3.selectAll('#selected').remove()})
                .call(
                    d3.drag()
                        .on('start', (e, d) => {
                            this.cumm_dx = 0;
                            this.cumm_dy = 0;
                            this.drag_startX = d3.select(e.sourceEvent.target).attr('x') - 1;
                            this.drag_startY = d3.select(e.sourceEvent.target).attr('y') - 1;
                        })
                        .on('drag', (e, d) => {
                            d3.selectAll('#selected').remove();
                            this.cumm_dx += e.dx;
                            this.cumm_dy += e.dy;

                            if (this.cumm_dx < 0) {
                                this.select_startX = Math.max(e.x + 1, this.margin.left)
                                this.select_endX = this.drag_startX + this.x_scale.bandwidth()
                            } else {
                                this.select_startX = this.drag_startX;
                                this.select_endX = Math.min(e.x - 1, this.width - this.margin.right)
                            }

                            if (this.cumm_dy < 0) {
                                this.select_startY = Math.max(e.y + 1, this.margin.top)
                                this.select_endY = this.drag_startY + this.y_scale.bandwidth()
                            } else {
                                this.select_startY = this.drag_startY;
                                this.select_endY = Math.min(e.y - 1, this.height - this.margin.bottom)
                            }

                            d3.select(this.node)
                                .append('rect')
                                    .attr('id', 'selected')
                                    .attr('x', this.select_startX)
                                    .attr('y', this.select_startY)
                                    .attr('fill', d3.rgb(0, 0, 10, 0.2))
                                    .attr('width', Math.abs(this.select_startX - this.select_endX))
                                    .attr('height', Math.abs(this.select_startY - this.select_endY))
                                    .style('stroke', 'black')
                                    .style('stroke-width', '0.5')
                                    .on('click', (d) => {d3.selectAll('#selected').remove()})
                        })
                        .on('end', (e, d) => {
                            const endrect_x = parseFloat(d3.select(e.sourceEvent.toElement).attr('x'));
                            const endrect_y = parseFloat(d3.select(e.sourceEvent.toElement).attr('y'));

                            if (this.cumm_dx < 0) {
                                this.select_startX = Math.max(Number.isNaN(endrect_x) ? 0 : endrect_x, this.margin.left);
                            } else {
                                this.select_endX = Math.min(
                                    Number.isNaN(endrect_x) ? (this.width - this.margin.right) : (endrect_x + this.x_scale.bandwidth()),
                                    this.width - this.margin.right
                                );
                            }

                            if (this.cumm_dy < 0) {
                                this.select_startY = Math.max(Number.isNaN(endrect_y) ? 0 : endrect_y, this.margin.top);
                            } else {
                                this.select_endY = Math.min(
                                    Number.isNaN(endrect_y) ? (this.height - this.margin.bottom) : (endrect_y + this.y_scale.bandwidth()),
                                    this.height - this.margin.bottom
                                );
                            }

                            d3.selectAll('#selected').remove();
                            d3.select(this.node)
                                .append('rect')
                                    .attr('id', 'selected')
                                    .attr('x', this.select_startX)
                                    .attr('y', this.select_startY)
                                    .attr('fill', d3.rgb(0, 0, 10, 0.2))
                                    .attr('width', Math.abs(this.select_startX - this.select_endX))
                                    .attr('height', Math.abs(this.select_startY - this.select_endY))
                                    .style('stroke', 'black')
                                    .style('stroke-width', '0.5')
                                    .on('click', (d) => {d3.selectAll('#selected').remove()});

                            const selected = d3.select('#selected')
                            const selected_x1 = parseFloat(selected.attr('x'))
                            const selected_y1 = parseFloat(selected.attr('y'))
                            const selected_x2 = parseFloat(selected.attr('x')) + parseFloat(selected.attr('width'))
                            const selected_y2 = parseFloat(selected.attr('y')) + parseFloat(selected.attr('height'))
                            const coord_to_idx = []

                            const c_x1 = (selected_x1 - this.margin.left) / this.x_scale.bandwidth()
                            const c_x2 = (selected_x2 - this.margin.left - this.x_scale.bandwidth()) / this.x_scale.bandwidth()
                            const c_y1 = (selected_y1 - this.margin.top) / this.y_scale.bandwidth()
                            const c_y2 = (selected_y2 - this.margin.top - this.y_scale.bandwidth()) / this.y_scale.bandwidth()

                            for (let i = c_y1; i <= c_y2; i++) {
                                for (let j = c_x1; j <= c_x2; j++) {
                                    coord_to_idx.push((this.x_label.length - 1 - i) * this.y_label.length + j)
                                }
                            }

                            const selected_rects = d3
                                .selectAll('#heatbox')
                                .filter((d, i) => {
                                    return coord_to_idx.includes(i)
                                })
                                .data()

                            axios
                                .post('http://localhost:5000/drag', selected_rects)
                                .then(response => {
                                    console.log(response)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        })
                );

        const legend = svg.append("g")
            .attr("transform", d => `translate(${this.margin.left},0)`);

        legend
            .selectAll("rect")
            .data(this.legendBins)
            .enter()
            .append("rect")
            .attr("x", (d, i) => this.legendElementWidth * i)
            .attr("y", this.height - this.margin.bottom + this.legendHeight )
            .attr("width", this.legendElementWidth)
            .attr("height", this.legendHeight)
            .style("fill", d => this.color_scale(d));

        legend
            .selectAll("text")
            .data(this.legendBins)
            .enter()
            .append("text")
            .text(d => " ≥" + d.toExponential(1))
            .attr("x", (d, i) => this.legendElementWidth * i + 5)
            .attr("y", this.height - this.margin.bottom + (this.legendHeight * 3))
            .style("font-size", "9pt")
            .style("font-family", "Consolas, courier")
            .style("fill", "#aaa")
            .style('fill-opacity', 0.7);
    }

    highlight = (e) => {
        d3
            .select(e.target)
            .style('stroke', 'gray')
            .style('fill-opacity', 1)
            // shrink a bit to make room for stroke, now visible
            .attr('x', d => this.x_scale(d.cov_lbl) + this.margin.left + 1)
            .attr('y', d => this.y_scale(d.qty_pct) + this.margin.top + 1)
            .attr('width', this.x_scale.bandwidth() - 2)
            .attr('height', this.y_scale.bandwidth() - 2)
    }

    unhighlight = (e) => {
        d3
            .select(e.target)
            .attr('x', d => this.x_scale(d.cov_lbl) + this.margin.left)
            .attr('y', d => this.y_scale(d.qty_pct) + this.margin.top)
            .attr('width', this.x_scale.bandwidth())
            .attr('height', this.y_scale.bandwidth())
            .style('stroke', 'white')
            .style('fill-opacity', 0.7)
    }

    render() {
        return (
            <svg
                ref={(node) => {this.node = node}}
                width={this.width}
                height={this.height}>
            </svg>
        );
    }
}

export default HeatMap;