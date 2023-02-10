import { CalciteSegmentedControlCustomEvent } from '@esri/calcite-components';
import { useState, useCallback } from 'react';

export const useSegmentedControl = <T extends string>(defaultVal: T) => {
  const [selected, setSelected] = useState<T>(defaultVal);

  const handleSelectionChange = useCallback(
    (e: CalciteSegmentedControlCustomEvent<void>) => {
      setSelected(e.target.value as T);
    },
    []
  );

  const itemProps = useCallback(
    (value: T, label?: string) => ({
      value,
      ...(value === selected ? { checked: true } : {}),
      children: label || value,
    }),
    [selected]
  );

  return { selected, handleSelectionChange, itemProps };
};
