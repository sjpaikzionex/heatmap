import { Component } from 'react';
import HeatMap from './heatmap';
import Threshold from './threshold';


class App extends Component {
    render () {
        return (
            <div>
                <h3>Heat Map</h3>
                <HeatMap size={[820, 500]}/>
                <h3>Select Criteria</h3>
                <Threshold />
            </div>
        );
    }
}

export default App;
