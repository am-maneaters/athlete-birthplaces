import MapViewComponent from './arcgisUtils/MapViewComponent';

import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

import { CalciteShell } from '@esri/calcite-components-react';

import Basemap from '@arcgis/core/Basemap';
import { AppPanel } from './components/AppPanel';
import { Sport } from './utils/imageUtils';

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

const useSearchParams = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const sportParam = params.get('sport');
  const teamIdParam = params.get('teamId');
  const playerIdParam = params.get('playerId');

  // make sure sport is valid
  const sport = Object.values(Sport).includes(sportParam as Sport)
    ? (sportParam as Sport)
    : Sport.Hockey;

  const teamId = teamIdParam ?? undefined;
  const playerId = playerIdParam ?? undefined;

  return { sport, teamId, playerId };
};

export function App() {
  const { sport, teamId, playerId } = useSearchParams();
  return (
    <div>
      <CalciteShell className="calcite-mode-dark">
        <MapViewComponent
          mapProps={{ basemap }}
          mapViewProps={mapProps}
          style={{ height: '100vh' }}
        >
          <div className="absolute inset-4 flex justify-end items-start pointer-events-none [&>*]:pointer-events-auto ">
            <AppPanel
              initialSport={sport}
              initialTeamId={teamId}
              initialPlayerId={playerId}
            />
          </div>
        </MapViewComponent>
      </CalciteShell>
    </div>
  );
}
