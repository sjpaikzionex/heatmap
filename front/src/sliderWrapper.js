import React, { Component } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './threshold.css';

class SliderWrapper extends Component {
    state = {
        maxCov: [1.5]
    }

    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this)
    }

    handler(v) {
        this.setState({
            maxCov: v
        })
        this.props.handler(v)
    }

    render() {
        return (
            <div>
                <Range
                    label={true}
                    name='maxCov'
                    step={0.1}
                    min={0}
                    max={1.9}
                    values={this.state.maxCov}
                    onChange={this.handler}
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
        );
    }
}

export default SliderWrapper;
