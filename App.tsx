import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import Map from 'react-map-gl';
import 

import DrawControl from './draw-control';
import ControlPanel from './control-panel';

const TOKEN = 'pk.eyJ1IjoiMGxtYWdhbGhhZXMwIiwiYSI6ImNreW9hZ2UwMjBicHMyb24ya3ZjMngzZXcifQ.sP6WDJMXX8IvR3iZNkwnZQ';

export default function App() {
  const [features, setFeatures] = useState({});

  	//All of the selected points coordinates
	const [lineCoordinates, setLineCoordinates] = useState('');

	const dispatch = useDispatch<AppDispatch>();
	const points = useSelector((state) => state.pointReducer);

	//Receiving calculated distance from redux
	const totalDistance = useSelector((state) => state.distanceReducer.distance);

  const onUpdate = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: 25.285,
          latitude: 54.677,
          zoom: 14.5,
          bearing: -11.20,
          pitch: 70.50
        }}
        mapStyle="mapbox://styles/0lmagalhaes0/cl0zhlubl000c14o6m00f8jfn"
        mapboxAccessToken={TOKEN}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
      <ControlPanel polygons={Object.values(features)} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
