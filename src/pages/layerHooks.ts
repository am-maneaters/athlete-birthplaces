import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

import { useEffect } from 'react';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';

import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { useQuery } from '@tanstack/react-query';
import { replaceFeatures } from './layerUtils';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import Graphic from '@arcgis/core/Graphic';
import Polyline from '@arcgis/core/geometry/Polyline';
import Point from '@arcgis/core/geometry/Point';
import * as geodesicUtils from '@arcgis/core/geometry/support/geodesicUtils';
import { array } from 'yup';
import {
  useFeatureLayer,
  useFeatureLayerView,
} from '../arcgisUtils/useGraphicsLayer';
import { Team, teamSchema } from '../schemas/teamSchema';
import { athleteSchema } from '../schemas/athleteSchema';
import { graphicSchema } from '../schemas/graphicSchema';
import { PointGraphic } from './AthleteTypes';

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

const nhlTeamsLayerUrl =
  'https://services1.arcgis.com/wQnFk5ouCfPzTlPw/arcgis/rest/services/ESPN_Big_Four_Teams/FeatureServer/0';

export function useTeamsLayer(
  mapView: __esri.MapView | undefined,
  selectedTeamId: string | undefined,
  selectedSport: string
) {
  const baseTeamLayer = useFeatureLayer(mapView, {
    url: nhlTeamsLayerUrl,
    title: 'NHL Teams',
    outFields: ['*'],
    visible: false,
  });

  const teamsLayer = useFeatureLayer(mapView, {
    title: 'Team Points',
    source: [],
    objectIdField: 'ObjectId',
    geometryType: 'point',
    spatialReference: { wkid: 4326 },
    outFields: ['*'],
    fields: [
      {
        name: 'ObjectId',
        alias: 'ObjectId',
        type: 'oid',
      },
      {
        name: 'id',
        alias: 'id',
        type: 'string',
      },
      {
        name: 'logo',
        alias: 'logo',
        type: 'string',
      },
      {
        name: 'name',
        alias: 'name',
        type: 'string',
      },
    ],
  });

  const teamsView = useFeatureLayerView(mapView, baseTeamLayer);

  useEffect(() => {
    if (!mapView || !teamsView) return;

    const sportTypeFilter = new FeatureFilter({
      where: `type = '${selectedSport}'`,
    });

    teamsView.filter = sportTypeFilter;
  }, [mapView, selectedSport, teamsView]);

  //   Apply feature effect to the teams layer
  useEffect(() => {
    if (!mapView || !selectedTeamId) {
      teamsLayer.featureEffect = new FeatureEffect();
      return;
    }

    teamsLayer.featureEffect = new FeatureEffect({
      excludedEffect: 'opacity(20%)',
      filter: {
        where: `id = '${selectedTeamId}'`,
      },
    });
  }, [teamsLayer, mapView, selectedTeamId]);

  //  Query the base team layer for the selected sport
  const { data: teamFeatures } = useQuery(
    ['teamInfo', selectedSport],
    async ({ signal }) => {
      const features = await baseTeamLayer.queryFeatures(
        {
          where: `type = '${selectedSport}'`,
          outFields: ['*'],
          returnGeometry: true,
        },
        { signal }
      );
      return array().of(graphicSchema(teamSchema)).validate(features.features);
    }
  );

  //  Replace features in the teams layer
  useEffect(() => {
    if (!teamFeatures || !teamsLayer) return;

    teamsLayer.renderer = new UniqueValueRenderer({
      field: 'logo',
      uniqueValueInfos: teamFeatures.map(({ attributes }) => ({
        value: attributes?.logo,
        symbol: new PictureMarkerSymbol({
          url: attributes?.logo,
          width: '48px',
          height: '48px',
        }),
      })),
    });

    const newFeatures = teamFeatures.map(
      ({ geometry, attributes }) =>
        new Graphic({
          geometry: new Point({
            longitude: geometry.longitude,
            latitude: geometry.latitude,
          }),
          attributes: { ...attributes },
        })
    );

    replaceFeatures(teamsLayer, newFeatures);
  }, [baseTeamLayer.fields, teamFeatures, teamsLayer]);

  return { teamsLayer, teamFeatures };
}
