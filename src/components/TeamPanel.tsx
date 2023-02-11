import {
  CalciteSelect,
  CalciteOption,
  CalciteList,
  CalciteListItemGroup,
  CalciteActionBar,
  CalciteAction,
} from '@esri/calcite-components-react';
import { AthleteListItem } from './AthleteListItem';
import { Team } from '../schemas/teamSchema';
import { Athlete } from '../schemas/athleteSchema';
import { PointGraphic } from '../pages/AthleteTypes';
import { useState } from 'react';

type TeamPanelProps = {
  team: Team;
  athletes: PointGraphic<Athlete>[] | undefined;
  onAthleteClick: (athlete: Athlete) => void;
  loading?: boolean;
};

type SortField = {
  field: keyof Athlete;
  label: string;
  group?: boolean;
};

const sortingFields: SortField[] = [
  { field: 'fullName', label: 'Name' },
  { field: 'weight', label: 'Weight' },
  { field: 'height', label: 'Height' },
  { field: 'age', label: 'Age' },
  { field: 'positionName', label: 'Position', group: true },
  { field: 'birthCountry', label: 'Birthplace', group: true },
];

export function TeamPanel({
  team,
  athletes,
  onAthleteClick,
  loading,
}: TeamPanelProps) {
  const [sort, setSort] = useState(sortingFields[0]);

  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const sortedAthletes = athletes?.sort((a, b) => {
    const aVal = a.attributes[sort.field];
    const bVal = b.attributes[sort.field];
    if (!aVal || !bVal) return 0;
    if (aVal < bVal) {
      return -1;
    }
    if (aVal > bVal) {
      return 1;
    }
    return 0;
  });

  const groupedAthletes = sort.group
    ? sortedAthletes?.reduce((acc, athlete) => {
        const position = athlete.attributes[sort.field];
        if (!position) return acc;
        const key = position.toString();
        if (acc[key]) {
          acc[key].push(athlete);
          return acc;
        }
        return { ...acc, [key]: [athlete] };
      }, {} as Record<string, PointGraphic<Athlete>[]>)
    : undefined;

  return (
    <div className="flex flex-col min-h-0 bg-foreground-2">
      <div className="flex h-32" style={{ backgroundColor: team.color }}>
        <div className="py-2 px-4">
          <h1 className="text-5 text-white uppercase italic">
            {team.location}
          </h1>
          <h1 className="text-4 text-white uppercase italic">{team.name}</h1>
        </div>
        <div className="w-[175px] flex justify-center items-center overflow-y-clip">
          <img
            height={100}
            className="scale-150 opacity-30"
            src={team.logo}
            alt="Team Logo"
          />
        </div>
      </div>

      <div className="px-2 py-1 flex items-center justify-between">
        <CalciteActionBar layout="horizontal" expandDisabled>
          <CalciteAction
            icon="embedded-card"
            active={viewMode === 'card' ? true : undefined}
            onClick={() => setViewMode('card')}
            text="Card"
            scale="s"
          />
          <CalciteAction
            icon="list"
            onClick={() => setViewMode('list')}
            active={viewMode === 'list' ? true : undefined}
            text="List"
            scale="s"
          />
        </CalciteActionBar>

        <CalciteSelect
          label="Test"
          onCalciteSelectChange={(e) =>
            setSort(e.target.value as unknown as SortField)
          }
          value={sort}
          scale="s"
        >
          {sortingFields.map((sort) => (
            <CalciteOption key={sort.field} value={sort} label={sort.label} />
          ))}
        </CalciteSelect>
      </div>

      <div className="overflow-auto min-h-0">
        <CalciteList loading={loading ? true : undefined}>
          {groupedAthletes &&
            Object.entries(groupedAthletes).map(([position, athletes]) => (
              <CalciteListItemGroup key={position} heading={position}>
                {athletes?.map(({ attributes }) => (
                  <AthleteListItem
                    key={attributes.id}
                    mode={viewMode}
                    athlete={attributes}
                    teamLogoUrl={team.logo}
                    onClick={() => onAthleteClick(attributes)}
                  />
                ))}
              </CalciteListItemGroup>
            ))}

          {!groupedAthletes &&
            sortedAthletes?.map(({ attributes }) => (
              <AthleteListItem
                key={attributes.id}
                mode={viewMode}
                athlete={attributes}
                teamLogoUrl={team.logo}
                onClick={() => onAthleteClick(attributes)}
              />
            ))}
        </CalciteList>
      </div>
    </div>
  );
}
