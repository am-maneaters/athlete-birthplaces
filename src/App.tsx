import MapViewComponent from './arcgisUtils/MapViewComponent';

import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

import { CalciteShell } from '@esri/calcite-components-react';

import { useState } from 'react';
import MapView from '@arcgis/core/views/MapView';

import Basemap from '@arcgis/core/Basemap';
import { TeamPanel } from './components/TeamPanel';
import { useTeamsLayer } from './hooks/teamLayerHooks';
import { Sport } from './utils/imageUtils';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

const mapProps: __esri.MapViewProperties = {
  ui: { components: [] },
  center: [-98, 38.88],
  zoom: 4,
  padding: { right: 300 },
  constraints: {
    // minZoom: 2,
    // maxZoom: 10,
    rotationEnabled: false,
  },
};

const basemap = new Basemap({
  baseLayers: [
    new VectorTileLayer({
      portalItem: {
        id: '4319987495b946418b1cde2f7c29ab1c',
      },
    }),
  ],
});

export function App() {
  return (
    <div>
      <CalciteShell className="calcite-mode-dark">
        <MapViewComponent
          mapProps={{ basemap }}
          mapViewProps={mapProps}
          style={{ height: '100vh' }}
        >
          <div className="absolute inset-4 flex justify-end items-start pointer-events-none [&>*]:pointer-events-auto ">
            <TeamPanel />
          </div>
        </MapViewComponent>
      </CalciteShell>
    </div>
  );
}
