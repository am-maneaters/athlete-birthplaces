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

const regionFields = {
  City: ['birthCity', 'birthState', 'birthCountry'],
  State: ['birthState', 'birthCountry'],
  Country: ['birthCountry'],
} as const;

export function createRegionFromAthlete(
  athlete: __esri.Graphic['attributes'],
  regionType: keyof typeof regionFields
): Region {
  const fields = regionFields[regionType];
  const label = fields
    .map((field) => athlete[field])
    .filter(Boolean)
    .join(', ');

  return {
    img: getCountryFlagUrl(athlete.country2Code),
    Country: athlete.birthCountry,
    State: athlete.birthState ?? undefined,
    City: athlete.birthCity,
    label: athlete[fields[0]] ?? '',
    count: 1,
    key: label,
  };
}

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
      const res = await athletesLayer?.queryFeatures(
        { returnGeometry: false },
        { signal }
      );

      if (!res) return [];

      const regions: Region[] = [];

      for (const { attributes } of res.features) {
        const region = createRegionFromAthlete(attributes, regionType);
        const index = regions.findIndex((r) => r.key === region.key);

        if (index === -1) {
          regions.push(region);
        } else {
          regions[index].count++;
        }
      }

      return regions
        .filter((region) => region.label)
        .sort((a, b) => b.count - a.count);
    },
  });

  return (
    <ListContainer loading={regionsLoading}>
      {Regions?.map((region) => (
        <RegionListItem
          key={region.key}
          region={region}
          onRegionClick={onRegionClick}
        />
      ))}
    </ListContainer>
  );
}
