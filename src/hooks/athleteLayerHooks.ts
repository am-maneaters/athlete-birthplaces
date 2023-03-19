import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';

import { useEffect } from 'react';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';

import {
  useFeatureLayer,
  useFeatureLayerView,
} from '../arcgisUtils/useGraphicsLayer';
import { Team } from '../schemas/teamSchema';

import { PointGraphic } from '../typings/AthleteTypes';

import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';

const nhlPlayersLayerUrl =
  'https://services1.arcgis.com/wQnFk5ouCfPzTlPw/arcgis/rest/services/BigFourAthletes_March23/FeatureServer/0';

export function useAthletesLayer(
  mapView: __esri.MapView | undefined,
  selectedTeam: PointGraphic<Team> | undefined,
  selectedSport: string
) {
  const athletesLayer = useFeatureLayer(mapView, {
    url: nhlPlayersLayerUrl,
    title: 'NHL Players',
    outFields: ['*'],
    labelingInfo: [
      {
        labelExpressionInfo: {
          expression: '$feature.birthCity',
        },
        symbol: {
          type: 'text',
          color: '#fff',
          haloColor: 'black',
          haloSize: '1px',
          font: {
            size: 8,
            family: 'Noto Sans',
            weight: 'bold',
          },
        },
        maxScale: 0,
        minScale: 1_500_000,
        labelPlacement: 'above-center',
      },
    ],
  });

  useEffect(() => {
    athletesLayer.effect = 'bloom(1, 1px, 99%)';
    athletesLayer.renderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        color: [255, 255, 255, 1],
        size: 5,
        outline: {
          color: [255, 255, 255, 0.1],
          width: 1,
        },
      }),
    });
  }, [athletesLayer]);

  const athletesLayerView = useFeatureLayerView(mapView, athletesLayer);

  useEffect(() => {
    if (!mapView || !athletesLayerView) return;

    const sportTypeFilter = new FeatureFilter({
      where: `type = '${selectedSport}'`,
    });

    athletesLayerView.filter = sportTypeFilter;
  }, [mapView, athletesLayerView, selectedSport]);

  useEffect(() => {
    if (!selectedTeam) {
      // @ts-expect-error - maps sdk types are wrong
      athletesLayer.featureEffect = undefined;
      return;
    }

    athletesLayer.featureEffect = new FeatureEffect({
      excludedEffect: 'opacity(20%)',
      // make the feature bigger
      includedEffect: 'drop-shadow(1px, 1px, 1px, black)',
      filter: {
        where: `teamId = ${selectedTeam?.attributes.id}`,
      },
    });
  }, [athletesLayer, selectedTeam]);

  return { athletesLayer };
}
