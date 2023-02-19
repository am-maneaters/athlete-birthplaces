import MapViewComponent from './arcgisUtils/MapViewComponent';

import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

import {
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
  CalciteShell,
} from '@esri/calcite-components-react';

import { useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { isGraphicsHit } from './utils/esriUtils';

import Basemap from '@arcgis/core/Basemap';
import { useSegmentedControl } from './hooks/calciteHooks';
import { useOnEvent } from './arcgisUtils/useOnEvent';
import { TeamPanel } from './components/TeamPanel';
import { useTeamsLayer } from './hooks/teamLayerHooks';
import { Sport } from './utils/imageUtils';

export function App() {
  const [mapView, setMapView] = useState<MapView>();

  const [selectedTeamId, setSelectedTeamId] = useState<string>();

  const [selectedPlayerId, setSelectedPlayerId] = useState<string>();

  const {
    selected: selectedSport,
    handleSelectionChange,
    itemProps,
  } = useSegmentedControl<Sport>(Sport.Hockey);

  useEffect(() => {
    // setSelectedPlayerId(undefined);
    setSelectedTeamId(undefined);
  }, [selectedSport]);

  const { teamsLayer, teamFeatures } = useTeamsLayer(
    mapView,
    selectedTeamId,
    selectedSport
  );

  useOnEvent(mapView, 'click', async (e) => {
    const mapHit = await mapView?.hitTest(e, {
      include: [teamsLayer],
    });

    if (!mapHit || mapHit.results.length === 0)
      return setSelectedTeamId(undefined);

    const [firstHit] = mapHit.results;

    if (isGraphicsHit(firstHit)) {
      const { graphic } = firstHit;

      if (!Object.hasOwn(graphic.attributes, 'id'))
        throw new Error('Could not get team id');
      setSelectedTeamId(graphic.attributes.id);
    }
  });

  return (
    <div>
      <CalciteShell className="calcite-theme-dark">
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
        />
        <div className="absolute inset-4 flex justify-between items-start pointer-events-none [&>*]:pointer-events-auto ">
          <div>
            <CalciteSegmentedControl
              onCalciteSegmentedControlChange={handleSelectionChange}
            >
              {Object.values(Sport).map((sport) => (
                <CalciteSegmentedControlItem
                  key={sport}
                  {...itemProps(sport as Sport, sport)}
                />
              ))}
            </CalciteSegmentedControl>
          </div>
          {teamFeatures && mapView && (
            <TeamPanel
              mapView={mapView}
              teamId={selectedTeamId}
              teams={teamFeatures}
              onAthleteClick={(athleteId) => {
                setSelectedPlayerId(athleteId);
                // mapView?.goTo({
                //   target: athlete.geometry,
                //   zoom: 8,
                // });
              }}
              sport={selectedSport}
              onTeamChange={(team) => {
                setSelectedTeamId(team?.id.toString());
              }}
            />
          )}
        </div>
      </CalciteShell>
    </div>
  );
}
