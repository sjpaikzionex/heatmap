import React, { Component } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './threshold.css';
import axios from 'axios';
const d3 = require('d3');

class Threshold extends Component {
    state = {
        cpu: '',
        time: '',
        target_count: 1000,
        maxCov: [1.5]
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'cpu') {
            //20 cpu, 1h = 1000 items
            // console.log(this.state.cpu)
            if (e.target.value === '') {
                this.setState({
                    'time': ''
                });

            } else {
                this.setState({
                    'time': 20 / e.target.value * this.state.target_count / 1000
                });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        d3.selectAll('#selected').remove()

        let new_count = this.state.cpu / 20 * this.state.time / 1 * 1000;

        if (this.state.cpu === '' || this.state.time === '') {
            new_count = 1000;
        }

        this.setState({
            'target_count': parseInt(new_count)
        });
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
        })

        const maxCov = this.state.maxCov[0]
        const selected = [];
        let select_count = 0;
        for (let i = 0; i < dat.length; i++) {
            if (parseFloat(dat[i].cov_lbl) <= maxCov && dat[i].sub_count !== 0) {
                selected.push(dat[i]);
                select_count += dat[i].sub_count;
            }
            if (select_count >= new_count) {
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

        const map = d3.select('svg')

        for (let i = 0; i < selectXY.length; i++) {
            map
                .append('rect')
                .attr('id', 'selected')
                .attr('x', selectXY[i].x)
                .attr('y', selectXY[i].y)
                .attr('width', boxwidth)
                .attr('height', boxheight)
                .attr('fill', d3.rgb(0, 0, 10, 0.2))
                .attr('stroke', 'black')
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


        // axios
        //     .post('http://localhost:5000/target_count', {target_count: new_count})
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='threshold-container'>
                        <input type='text' name='cpu' placeholder='Total CPU' value={this.state.cpu} onChange={this.handleChange}/>
                        <input type='text' name='time' placeholder='Process Time' value={this.state.time} onChange={this.handleChange}/>
                        <input type='submit' value='search' />
                        <label>Target Count: {this.state.target_count}</label>
                        <label>max cov</label>
                        <Range
                            label={true}
                            name='maxCov'
                            step={0.1}
                            min={0}
                            max={1.9}
                            values={this.state.maxCov}
                            onChange={(v) => this.setState({'maxCov': v})}
                            renderTrack={ ({ props, children }) => (
                                <div
                                    onMouseDown={props.onMouseDown}
                                    onTouchStart={props.onTouchStart}
                                    style={{
                                        ...props.style,
                                        height: "36px",
                                        display: "flex",
                                        width: "100%"
                                    }}
                                >
                                    <div
                                        ref={props.ref}
                                        style={{
                                        height: "5px",
                                        width: "100%",
                                        borderRadius: "4px",
                                        background: getTrackBackground({
                                            values: this.state.maxCov,
                                            colors: ["#548BF4", "#ccc"],
                                            min: 0,
                                            max: 1.9
                                        }),
                                        alignSelf: "center"
                                        }}
                                    >
                                        {children}
                                    </div>
                                </div>
                            )}
                            renderThumb={ ({props, isDragged}) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: "20px",
                                        width: "20px",
                                        borderRadius: "4px",
                                        backgroundColor: "#FFF",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0px 2px 6px #AAA"
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "8px",
                                            width: "3px",
                                            backgroundColor: isDragged ? "#548BF4" : "#CCC"
                                        }}
                                    />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '-28px',
                                            color: '#fff',
                                            fontSize: '12px',
                                            fontFamily: 'Calibri',
                                            padding: '3px',
                                            borderRadius: '4px',
                                            backgroundColor: '#548BF4'
                                        }}
                                    >
                                        {this.state.maxCov}
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Threshold;
