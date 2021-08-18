import { Component } from 'react';
import HeatMap from './heatmap';
import axios from 'axios';
import SliderWrapper from './sliderWrapper';
import SelectedStat from './selectedstat';
const d3 = require('d3');


class App extends Component {
    constructor(props) {
        super(props);
        this.rangehandler = this.rangehandler.bind(this)
        this.selecthandler = this.selecthandler.bind(this)
        this.state = {
            clicked: 0,
            maxCov: [1.5],
            target_count: 1000
        }
    }

    rangehandler(v) {
        this.setState({
            maxCov: v
        })
    }

    selecthandler() {
        this.setState({
            clicked: 1
        })
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

        const maxCov = this.state.maxCov[0]
        const selected = [];
        let select_count = 0;
        for (let i = 0; i < dat.length; i++) {
            if (parseFloat(dat[i].cov_lbl) <= maxCov && dat[i].sub_count !== 0) {
                selected.push(dat[i]);
                select_count += dat[i].sub_count;
            }
            if (select_count >= this.state.target_count) {
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
                .style('stroke-width', '0.5')
                .on('click', (d) => {d3.selectAll('#selected').remove()});
        }

        axios
            .post('http://localhost:5000/drag', selected)
            .then(response => {
                this.selecthandler();
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
                <HeatMap size={[820, 500]} select_handler={this.selecthandler}/>
                <h3>Select Criteria</h3>
                <h5>Target Count: {this.state.target_count}</h5>
                <form onSubmit={this.handleSubmit}>
                    <SliderWrapper handler={this.rangehandler}/>
                    <button type='submit'>Search</button>
                </form>
                <h3>Selected Stat</h3>
                <SelectedStat size={[450, 800]} trigger={this.state.clicked} />
            </div>
        );
    }
}

export default App;
