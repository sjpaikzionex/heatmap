import { Component } from 'react';
import HeatMap from './heatmap';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';
import Threshold from './threshold';
const d3 = require('d3');


class App extends Component {
    constructor(props) {
        super(props);
        this.rangehandler = this.rangehandler.bind(this)
    }

    target_count = 1500;
    maxCov = [1.5]

    rangehandler(v) {
        this.maxCov = v
    }

    handleSubmit = (e) => {
        e.preventDefault();
        d3.selectAll('#selected').remove()

        let dat = Array.from(d3.selectAll('#heatbox').data());
        dat.sort((a, b) => {
            if (a.qty_pct < b.qty_pct)
                return 1;

            if (a.qty_pct > b.qty_pct)
                return -1;

            if (a.cov_lbl > b.cov_lbl)
                return 1;

            if (a.cov_lbl < b.cov_lbl)
                return -1;

            return 0;
        });

        const maxCov = this.maxCov[0]
        const selected = [];
        let select_count = 0;
        for (let i = 0; i < dat.length; i++) {
            if (parseFloat(dat[i].cov_lbl) <= maxCov && dat[i].sub_count !== 0) {
                selected.push(dat[i]);
                select_count += dat[i].sub_count;
            }
            if (select_count >= this.target_count) {
                break;
            }
        }

        const boxwidth = d3.select('#heatbox').attr('width');
        const boxheight = d3.select('#heatbox').attr('height');

        const selectBox = d3.selectAll('#heatbox').filter(d => {return selected.includes(d);})

        let selectXY = []
        for (let i = 0; i < selectBox._groups[0].length; i++) {
            selectXY.push({
                x: d3.select(selectBox._groups[0][i]).attr('x'),
                y: d3.select(selectBox._groups[0][i]).attr('y')
            })
        }

        const map = d3.select('#heatmap')

        for (let i = 0; i < selectXY.length; i++) {
            map
                .append('rect')
                .attr('id', 'selected')
                .attr('x', selectXY[i].x)
                .attr('y', selectXY[i].y)
                .attr('width', boxwidth)
                .attr('height', boxheight)
                .attr('fill', d3.rgb(0, 0, 10, 0.2))
                .style('stroke-width', '0.5');
        }

        axios
            .post('http://localhost:5000/drag', selected)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render () {
        return (
            <div>
                <h3>Heat Map</h3>
                <HeatMap size={[820, 500]}/>
                <h3>Select Criteria</h3>
                <form onSubmit={this.handleSubmit}>
                    <Threshold handler={this.rangehandler}/>
                    <button type='submit'>Search</button>
                </form>
            </div>
        );
    }
}

export default App;
