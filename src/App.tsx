import MapViewComponent from './arcgisUtils/MapViewComponent';

import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

import { CalciteShell } from '@esri/calcite-components-react';

import { useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';

import Basemap from '@arcgis/core/Basemap';
import { TeamPanel } from './components/TeamPanel';
import { useTeamsLayer } from './hooks/teamLayerHooks';
import { Sport } from './utils/imageUtils';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

export function App() {
  const [mapView, setMapView] = useState<MapView>();

  const [selectedTeamId, setSelectedTeamId] = useState<string>();

  const [selectedPlayerId, setSelectedPlayerId] = useState<string>();

  const [panelMode, setPanelMode] = useState<'Teams' | 'Regions'>('Teams');

  const [sport, setSport] = useState(Sport.Hockey);

  useEffect(() => {
    // setSelectedPlayerId(undefined);
    setSelectedTeamId(undefined);
  }, [sport]);

  const { teamsLayer, isLoading, teamsGraphics } = useTeamsLayer(
    mapView,
    selectedTeamId,
    sport
  );

  useEffect(() => {
    if (panelMode === 'Regions') {
      setSelectedTeamId(undefined);
      teamsLayer.visible = false;
    } else {
      teamsLayer.visible = true;
    }
  }, [panelMode, teamsLayer]);

  //   Apply feature effect to the teams layer

  useEffect(() => {
    if (!mapView || !selectedTeamId) {
      // Clear the feature effect
      // @ts-expect-error - maps sdk types are wrong
      teamsLayer.featureEffect = undefined;
      return;
    }

    teamsLayer.featureEffect = new FeatureEffect({
      excludedEffect: 'opacity(20%)',
      filter: {
        where: `espn_id = '${selectedTeamId}'`,
      },
      excludedLabelsVisible: false,
    });
  }, [teamsLayer, mapView, selectedTeamId]);
  return (
    <div>
      <CalciteShell className="calcite-mode-dark">
        <MapViewComponent
          mapProps={{
            basemap: new Basemap({
              baseLayers: [
                new VectorTileLayer({
                  portalItem: {
                    id: '4319987495b946418b1cde2f7c29ab1c',
                  },
                }),
              ],
            }),
          }}
          mapViewProps={{
            ui: { components: [] },
            center: [-98, 38.88],
            zoom: 4,
            padding: { right: 300 },
            constraints: {
              minZoom: 2,
              maxZoom: 10,
              rotationEnabled: false,
            },
          }}
          onMapViewLoad={(loadedView) => {
            setMapView(loadedView);
          }}
          style={{ height: '100vh' }}
        >
          <div className="absolute inset-4 flex justify-end items-start pointer-events-none [&>*]:pointer-events-auto ">
            <TeamPanel
              teams={teamsGraphics}
              teamId={selectedTeamId}
              isLoading={isLoading}
              onAthleteSelect={(athleteId) => {
                // setPanelMode('Athletes');
                setSelectedPlayerId(athleteId);
              }}
              sport={sport}
              onTeamSelect={(teamId) => {
                setSelectedTeamId(teamId?.toString());
              }}
              mode={panelMode}
              onModeChange={setPanelMode}
              onSportChange={setSport}
              teamsLayer={teamsLayer}
            />
          </div>
        </MapViewComponent>
      </CalciteShell>
    </div>
  );
}
