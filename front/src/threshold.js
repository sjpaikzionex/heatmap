import React, { Component } from 'react';
import './threshold.css';
import axios from 'axios';

class Threshold extends Component {
    state = {
        cpu: '',
        time: '',
        target_count: 1000
    }

    constructor(props) {
        super(props)
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

        let new_count = this.state.cpu / 20 * this.state.time / 1 * 1000;

        if (this.state.cpu === '' || this.state.time === '') {
            new_count = 1000
        }

        this.setState({
            'target_count': new_count
        });
        console.log(new_count)

        axios
            .post('http://localhost:5000/target_count', {target_count: new_count})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='threshold-container'>
                        <input type='text' name='cpu' placeholder='Total CPU' value={this.state.cpu} onChange={this.handleChange}/>
                        <input type='text' name='time' placeholder='Process Time' value={this.state.time} onChange={this.handleChange}/>
                        <input type='submit' value='search'/>
                        <label>Target Count: {this.state.target_count}</label>
                        <input type='range' />
                    </div>
                </form>
            </div>
        );
    }
}

export default Threshold;
