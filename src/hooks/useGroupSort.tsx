import { useMemo } from 'react';

export type SortField = {
  field: string;
  altField?: string;
  label: string;
  transform?: (val: string | number | boolean) => string | number;
  group?: boolean;
};

export function useGroupSort<
  T extends Record<string, string | number | boolean | null>
>(items: T[] | undefined, sort: SortField, sortDirection: 'asc' | 'desc') {
  const groupedItems = useMemo(() => {
    if (!items) return undefined;
    // eslint-disable-next-line unicorn/no-array-reduce
    const lookup = items.reduce((acc, item) => {
      const field = item[sort.field] ? sort.field : sort.altField ?? sort.field;

      const position = item[field];

      if (!position) return acc;

      const key = sort.transform
        ? sort.transform(position)
        : position.toString();

      if (acc[key]) {
        acc[key].push(item);
        return acc;
      }
      return { ...acc, [key]: [item] };
    }, {} as Record<string, T[]>);
    return Object.entries(lookup);
  }, [items, sort]);

  const sortedItems = useMemo(
    () =>
      groupedItems?.sort(([aVal], [bVal]) => {
        if (!aVal && !bVal) return 0;
        if (!aVal) return -1;
        if (!bVal) return 1;

        const dir = sortDirection === 'asc' ? 1 : -1;

        return (
          aVal.localeCompare(bVal, undefined, {
            numeric: true,
            sensitivity: 'base',
          }) * dir
        );
      }),
    [groupedItems, sortDirection]
  );

  return sortedItems;
}
