import { Component } from 'react';
import HeatMap from './heatmap';
import Threshold from './threshold';


class App extends Component {
    render () {
        return (
            <div>
                <HeatMap size={[820, 500]}/>
                <Threshold />
            </div>
        );
    }
}

export default App;
