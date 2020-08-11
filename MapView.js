import { requireNativeComponent } from 'react-native';

// requireNativeComponent 自动把'RNTMap'解析为'RNTMapManager'
export default requireNativeComponent('RNTMap');
// import MapView from './MapView.js';

class MapView extends React.Component {
    render() {
      return <RNTMap />;
    }
  }
  
  MapView.propTypes = {
    /**
     * A Boolean value that determines whether the user may use pinch
     * gestures to zoom in and out of the map.
     */
    zoomEnabled: PropTypes.bool
  };
}


const RNTMap = requireNativeComponent('RNTMap', MapView);

export default MapView;