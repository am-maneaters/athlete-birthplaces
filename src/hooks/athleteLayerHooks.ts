import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

import { useEffect } from 'react';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

import { useQuery } from '@tanstack/react-query';
import { replaceFeatures } from '../utils/layerUtils';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import * as geodesicUtils from '@arcgis/core/geometry/support/geodesicUtils';
import { array } from 'yup';
import {
  useFeatureLayer,
  useFeatureLayerView,
} from '../arcgisUtils/useGraphicsLayer';
import { Team } from '../schemas/teamSchema';
import { athleteSchema } from '../schemas/athleteSchema';
import { graphicSchema } from '../schemas/graphicSchema';
import { PointGraphic } from '../typings/AthleteTypes';

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
  });

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
        width: 2,
      }),
    }),
  });

  const { data } = useQuery(['playerLineLayer', playerLineLayer], () =>
    playerLineLayer.queryFeatures().then((res) => res.features)
  );

  useEffect(() => {
    if (!mapView || !athletesView) return;

    const sportTypeFilter = new FeatureFilter({
      where: `type = '${selectedSport}'`,
    });

    athletesView.filter = sportTypeFilter;
  }, [mapView, athletesView, selectedSport]);

  useEffect(() => {
    if (!selectedTeam) {
      athletesLayer.featureEffect = new FeatureEffect({
        filter: { where: '1=0' },
      });
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
          where: `teamId = ${selectedTeam?.attributes.id} AND type = '${selectedSport}'`,
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
      enabled: !!selectedTeam?.attributes.id,
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    if (!selectedTeam || !athleteQuery.data) return;

    const teamPoint = [
      selectedTeam.geometry.longitude,
      selectedTeam.geometry.latitude,
    ];
    const newGraphics = athleteQuery.data.map(({ geometry, attributes }) => {
      const polyline = new Polyline({
        paths: [[[geometry.longitude, geometry.latitude], teamPoint]],
      });
      return new Graphic({
        geometry: geodesicUtils.geodesicDensify(
          polyline,
          Number.POSITIVE_INFINITY
        ),
        attributes: { ...attributes },
      });
    });

    replaceFeatures(playerLineLayer, newGraphics);

    // const lineColor = new Color(selectedTeam.attributes.color);

    // lineColor.a = 0.25;
    // playerLineLayer.renderer = new SimpleRenderer({
    //   symbol: new SimpleLineSymbol({
    //     color: lineColor,
    //     width: 2,
    //   }),
    // });
  }, [athleteQuery.data, playerLineLayer, selectedTeam]);

  return { athletesLayer, athleteQuery };
}
