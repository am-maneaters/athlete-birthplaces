import MapViewComponent from './arcgisUtils/MapViewComponent';

import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

import { CalciteShell } from '@esri/calcite-components-react';

import Basemap from '@arcgis/core/Basemap';
import { TeamPanel } from './components/TeamPanel';

const mapProps: __esri.MapViewProperties = {
  ui: { components: [] },
  center: [-98, 38.88],
  zoom: 4,
  padding: { right: 300 },
  constraints: {
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
