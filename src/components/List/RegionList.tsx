import React from 'react';
import { Region, RegionListItem } from '../ListItem/RegionListItem';
import { ListContainer } from './ListContainer';
import { useQuery } from '@tanstack/react-query';
import { getCountryFlagUrl } from '../../utils/imageUtils';

type Props = {
  sport: string;
  regionType: 'City' | 'State' | 'Country';
  showRegions: boolean;
  athletesLayer: __esri.FeatureLayer | undefined;
  onRegionClick: (region: Region) => void;
};

export default function RegionList({
  sport,
  regionType,
  showRegions,
  athletesLayer,
  onRegionClick,
}: Props) {
  const { data: Regions, isLoading: regionsLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['Regions', sport, regionType],
    enabled: showRegions,
    queryFn: async ({ signal }) => {
      const regionFields = {
        City: ['birthCity', 'birthState', 'birthCountry', 'country2Code'],
        State: ['birthState', 'birthCountry', 'country2Code'],
        Country: ['birthCountry', 'country2Code'],
      };

      const fields = regionFields[regionType];

      const feats = await athletesLayer?.queryFeatures(
        {
          where: `type = '${sport}'`,
          returnGeometry: false,
          groupByFieldsForStatistics: fields,
          orderByFields: ['count(*) desc'],
          outStatistics: [
            {
              statisticType: 'count',
              onStatisticField: '*',
              outStatisticFieldName: 'countOFExpr',
            },
          ],
        },
        { signal }
      );
      return feats?.features
        .filter((athlete) => athlete.attributes[fields[0]])
        .map(
          ({ attributes }) =>
            ({
              img: getCountryFlagUrl(attributes.country2Code),
              Country: attributes.birthCountry,
              State: attributes.birthState ?? undefined,
              City: attributes.birthCity,
              count: attributes.countOFExpr,
              label: attributes[fields[0]],
            } as Region)
        );
    },
  });
  return (
    <ListContainer loading={regionsLoading}>
      {Regions?.map((region) => (
        <RegionListItem
          key={region.label}
          region={region}
          onRegionClick={onRegionClick}
        />
      ))}
    </ListContainer>
  );
}
