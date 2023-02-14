import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

import { useEffect } from 'react';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

import { useQuery } from '@tanstack/react-query';
import { replaceFeatures } from '../utils/layerUtils';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import { array } from 'yup';
import {
  useFeatureLayer,
  useFeatureLayerView,
} from '../arcgisUtils/useGraphicsLayer';
import { Team } from '../schemas/teamSchema';
import { athleteSchema } from '../schemas/athleteSchema';
import { graphicSchema } from '../schemas/graphicSchema';
import { PointGraphic } from '../typings/AthleteTypes';

import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Color from '@arcgis/core/Color';
import { getLuminance } from '../utils/colorUtils';

const nhlPlayersLayerUrl =
  'https://services1.arcgis.com/wQnFk5ouCfPzTlPw/arcgis/rest/services/ESPN_API_Athletes/FeatureServer/0';

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
    effect: 'bloom(2.7, 0.5px, 2%)',
  });

  useEffect(() => {
    athletesLayer.renderer = new SimpleRenderer({
      symbol: new SimpleMarkerSymbol({
        color: [255, 255, 255, 1],
        size: 3,
        outline: {
          color: [255, 255, 255, 0.1],
          width: 1,
        },
      }),
    });
  }, [athletesLayer]);

  const athletesView = useFeatureLayerView(mapView, athletesLayer);

  const playerLineLayer = useFeatureLayer(mapView, {
    title: 'Player Lines',
    source: [],
    objectIdField: 'id',
    geometryType: 'polyline',
    spatialReference: { wkid: 4326 },
    fields: [
      {
        name: 'id',
        alias: 'id',
        type: 'oid',
      },
    ],
    renderer: new SimpleRenderer({
      symbol: new SimpleLineSymbol({
        color: [255, 0, 0, 0.25],
        width: 1,
      }),
    }),
    effect: 'bloom(1.7, 0.5px, 2%)',
  });

  useEffect(() => {
    if (!mapView || !athletesView) return;

    const sportTypeFilter = new FeatureFilter({
      where: `type = '${selectedSport}'`,
    });

    athletesView.filter = sportTypeFilter;
  }, [mapView, athletesView, selectedSport]);

  useEffect(() => {
    if (!selectedTeam) {
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

  const athleteQuery = useQuery(
    ['relatedPlayers', selectedTeam, selectedSport],
    async ({ signal }) => {
      const features = await athletesLayer.queryFeatures(
        {
          where: `type = '${selectedSport}' AND teamId = ${selectedTeam?.attributes.id}`,

          outFields: ['*'],
          returnGeometry: true,
        },
        { signal }
      );

      return array()
        .of(graphicSchema(athleteSchema))
        .validate(features.features);
    },
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    let isUpdating = false;

    async function updateLines() {
      if (isUpdating) return;
      isUpdating = true;

      await replaceFeatures(playerLineLayer, []);

      if (!athleteQuery.data || !selectedTeam) return;

      const primaryColor = new Color(selectedTeam.attributes.color);
      const secondaryColor = new Color(selectedTeam.attributes.alternateColor);

      const lineColor =
        getLuminance(primaryColor) > getLuminance(secondaryColor)
          ? primaryColor
          : secondaryColor;

      lineColor.a = 0.25;
      playerLineLayer.renderer = new SimpleRenderer({
        symbol: new SimpleLineSymbol({
          color: lineColor,
          width: 2,
        }),
      });

      const teamPoint = [
        selectedTeam.geometry.longitude,
        selectedTeam.geometry.latitude,
      ];
      const newGraphics = athleteQuery.data.map(({ geometry, attributes }) => {
        const polyline = new Polyline({
          paths: [[[geometry.longitude, geometry.latitude], teamPoint]],
        });

        return new Graphic({
          geometry: polyline,

          attributes: { ...attributes },
        });
      });

      await replaceFeatures(playerLineLayer, newGraphics);

      isUpdating = false;
    }
    updateLines();

    return () => {
      isUpdating = true;
    };
  }, [athleteQuery.data, playerLineLayer, selectedTeam]);

  return { athletesLayer, athleteQuery };
}
