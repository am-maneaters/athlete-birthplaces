import { CalciteSegmentedControlCustomEvent } from '@esri/calcite-components';
import { useState, useCallback } from 'react';

export const useSegmentedControl = <T extends string>(
  defaultVal: T,
  options?: { booleanProperty: string; labelChildren: boolean }
) => {
  const [selected, setSelected] = useState<T>(defaultVal);
  const booleanProperty = options?.booleanProperty || 'checked';
  const labelChildren = options?.labelChildren || false;

  const handleSelectionChange = useCallback(
    (e: CalciteSegmentedControlCustomEvent<void>) => {
      setSelected(e.target.value as T);
    },
    []
  );

  const itemProps = useCallback(
    (value: T, label?: string) => ({
      value,
      ...(value === selected ? { [booleanProperty]: true } : {}),
      ...(labelChildren ? { children: label || value } : {}),
    }),
    [booleanProperty, labelChildren, selected]
  );

  return { selected, handleSelectionChange, itemProps };
};
