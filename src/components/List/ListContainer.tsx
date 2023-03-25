import { CalciteList, CalciteLoader } from '@esri/calcite-components-react';

export const ListContainer = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => (
  <div className="overflow-auto flex-1">
    <CalciteList className="min-h-full">
      {loading && <CalciteLoader type="indeterminate" label="Loading..." />}
      {children}
    </CalciteList>
  </div>
);
