import { CalciteAction } from '@esri/calcite-components-react';
import React from 'react';

type Props = {
  bgColor?: string;
  onBackClick?: () => void;
  logo: string;
  title: string;
  subtitle: string;
};

export const PanelHeader = ({
  bgColor = 'black',
  onBackClick,
  logo,
  title,
  subtitle,
}: Props) => (
  <div
    className="flex justify-stretch overflow-hidden"
    style={{ backgroundColor: bgColor }}
  >
    {onBackClick && (
      <CalciteAction
        text="Back"
        icon="chevron-left"
        scale="s"
        style={{
          '--calcite-ui-text-3': 'white',
          justifySelf: 'flex-start',
        }}
        appearance="transparent"
        onClick={() => onBackClick()}
      />
    )}
    <div className="py-2 px-4 flex-1">
      <h1 className="text-4h text-color-1 uppercase italic whitespace-nowrap">
        {title}
      </h1>
      <h1 className=" text-3h text-color-1 uppercase italic whitespace-nowrap">
        {subtitle}
      </h1>
    </div>
    <img
      className="scale-150 opacity-30 flex-1 w-[100px] h-[100px] object-cover"
      src={logo}
      alt="Team Logo"
    />
  </div>
);
