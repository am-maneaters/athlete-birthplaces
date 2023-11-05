import { CalciteListItem } from '@esri/calcite-components-react';
import React from 'react';

export type Region = {
  img: string;
  count: number;
  Country: string;
  State?: string;
  City: string;
  label: string;
  key: string;
};

type Props = {
  region: Region;
  onRegionClick: (region: Region) => void;
};

export function RegionListItem({ region, onRegionClick }: Props) {
  return (
    <CalciteListItem label={region.label} onClick={() => onRegionClick(region)}>
      <div
        slot="content-start"
        className="flex relative overflow-y-clip w-[100px] h-[100px] content-center"
      >
        <img
          src={region.img}
          alt="Team Logo"
          height="108px"
          width="144px"
          loading="lazy"
          className="absolute inset-0 m-auto pl-2"
        />
      </div>
      <div slot="content" className="flex flex-col items-end">
        <div className="flex items-center text-2 text-end">{region.label}</div>
        <div className="flex items-center text-n2 text-end">
          <span>{region.count}</span>
        </div>
      </div>
    </CalciteListItem>
  );
}
