import MapViewComponent from '../components/MapViewComponent';
import { ArcUI } from '../components/ArcUI';

import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';

import {
  CalciteList,
  CalcitePanel,
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
  CalciteShell,
  CalciteShellPanel,
} from '@esri/calcite-components-react';

import { useMemo, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { isGraphicsHit } from '../utils/esriUtils';

import Basemap from '@arcgis/core/Basemap';
import { useAthletesLayer, useTeamsLayer } from './layerHooks';
import { useSegmentedControl } from './calciteHooks';
import { AthleteListItem, Sport } from './AthleteListItem';
import { useOnEvent } from '../hooks';

export function NhlPlayersDemo() {
  const [mapView, setMapView] = useState<MapView>();

  const [selectedTeamId, setSelectedTeamId] = useState<string>();

  const [selectedPlayerId, setSelectedPlayerId] = useState<string>();

  const {
    selected: selectedSport,
    handleSelectionChange,
    itemProps,
  } = useSegmentedControl<Sport>(Sport.Hockey);

  const { teamsLayer, teamFeatures } = useTeamsLayer(
    mapView,
    selectedTeamId,
    selectedSport
  );

  const selectedTeam = useMemo(() => {
    const feat = teamFeatures?.find(
      (f) => f.attributes.id.toString() === selectedTeamId
    );

    return feat;
  }, [selectedTeamId, teamFeatures]);

  const { athleteFeatures } = useAthletesLayer(
    mapView,
    selectedTeam,
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
          }}
          onMapViewLoad={(loadedView) => {
            setMapView(loadedView);
          }}
          style={{ height: '100vh' }}
        >
          <ArcUI position="top-left">
            <CalcitePanel>
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
            </CalcitePanel>
          </ArcUI>
        </MapViewComponent>
        <CalciteShellPanel slot="panel-end" widthScale="m">
          <CalcitePanel heading={selectedTeam?.attributes.displayName}>
            <CalciteList>
              {athleteFeatures?.map(({ attributes }) => (
                <AthleteListItem
                  key={attributes.id}
                  athlete={attributes}
                  teamLogoUrl={selectedTeam?.attributes.logo}
                  onClick={() => setSelectedPlayerId(attributes.id.toString())}
                />
              ))}
            </CalciteList>
          </CalcitePanel>
        </CalciteShellPanel>
      </CalciteShell>
    </div>
  );
}
