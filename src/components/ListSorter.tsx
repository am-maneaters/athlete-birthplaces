import {
  CalciteDropdown,
  CalciteButton,
  CalciteDropdownGroup,
  CalciteDropdownItem,
} from '@esri/calcite-components-react';
import { SortField } from '../hooks/useGroupSort';

export function ListSorter({
  sort,
  setSort,
  setSortDirection,
  sortDirection,
  fields,
}: {
  sort: {
    label: string;
  };
  setSort: (sort: SortField) => void;
  setSortDirection: (dir: 'asc' | 'desc') => void;
  sortDirection: string;
  fields: SortField[];
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
        {fields.map((sortField) => (
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
