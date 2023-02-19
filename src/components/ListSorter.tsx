import {
  CalciteDropdown,
  CalciteButton,
  CalciteDropdownGroup,
  CalciteDropdownItem,
} from '@esri/calcite-components-react';
import { Athlete } from '../schemas/athleteSchema';
import { states } from '../statesLookup';

type SortField = {
  field: keyof Athlete;
  altField?: keyof Athlete;
  label: string;
  transform?: (val: string | number | boolean) => string | number;
  group?: boolean;
};

function hasKey<O extends Record<string, unknown>>(
  obj: O,
  key: string | number | symbol
): key is keyof O {
  return key in obj;
}

export const sortingFields: SortField[] = [
  {
    field: 'birthState',
    altField: 'birthCountry',
    label: 'Birthplace',
    group: true,
    transform: (val) => {
      if (typeof val !== 'string') return val.toString();
      if (hasKey(states, val)) {
        return states[val];
      }
      return val;
    },
  },
  { field: 'lastName', label: 'Last Name' },
  { field: 'weight', label: 'Weight' },
  { field: 'height', label: 'Height' },
  { field: 'dateOfBirth', label: 'Age', transform: Number },
  { field: 'positionName', label: 'Position', group: true },
  { field: 'jersey', label: 'Jersey', transform: Number },
];

export function ListSorter({
  sort,
  setSort,
  setSortDirection,
  sortDirection,
}: {
  sort: {
    label: string;
  };
  setSort: (sort: SortField) => void;
  setSortDirection: (dir: 'asc' | 'desc') => void;
  sortDirection: string;
}) {
  return (
    <CalciteDropdown>
      <CalciteButton
        slot="trigger"
        iconStart="sort-descending"
        kind="neutral"
        appearance="outline-fill"
      >
        {sort.label}
      </CalciteButton>
      <CalciteDropdownGroup groupTitle="Sort Fields">
        {sortingFields.map((sortField) => (
          <CalciteDropdownItem
            key={sortField.field}
            label={sortField.label}
            onCalciteDropdownItemSelect={() => setSort(sortField)}
            selected={sortField.label === sort.label ? true : undefined}
          >
            {sortField.label}
          </CalciteDropdownItem>
        ))}
      </CalciteDropdownGroup>
      <CalciteDropdownGroup groupTitle="Sort Direction">
        <CalciteDropdownItem
          label="Ascending"
          onCalciteDropdownItemSelect={() => setSortDirection('asc')}
          selected={sortDirection === 'asc' ? true : undefined}
        >
          Ascending
        </CalciteDropdownItem>
        <CalciteDropdownItem
          label="Descending"
          onCalciteDropdownItemSelect={() => setSortDirection('desc')}
          selected={sortDirection === 'desc' ? true : undefined}
        >
          Descending
        </CalciteDropdownItem>
      </CalciteDropdownGroup>
    </CalciteDropdown>
  );
}
