import React, { Component } from 'react';
import axios from 'axios';
const d3 = require('d3');

class SelectedStat extends Component {
    constructor(props) {
        super(props);
        this.width = props.size[0];
        this.height = props.size[1];
        console.log(props.trigger)
    }

    componentDidMount() {
        if (this.props.trigger === 1) {
            this.datarequest =
                axios
                    .get('http://localhost:5000/get_selected')
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.trigger === 1) {
            this.datarequest =
                axios
                    .get('http://localhost:5000/get_selected')
                    .then(response => {
                        console.log(response.data)
                        this.data = response.data
                        this.createSelectedStat();
                    })
                    .catch(error => {
                        console.log(error)
                    });
        }
    }

    createSelectedStat() {
        const node = this.node;
        const svg = d3.select(node);
        const target_count = this.data.length;
        console.log(target_count)


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
