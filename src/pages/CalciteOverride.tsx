import { CSSProperties, useRef } from 'react';

type CalciteOverrideProps = {
  children: React.ReactElement;

  sx: Record<string, CSSProperties>;
};

const styleToString = (style: CSSProperties) =>
  Object.keys(style).reduce(
    (acc, key) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase() +
      ':' +
      style[key] +
      ';',
    ''
  );

export const CalciteOverride = ({ children, sx }: CalciteOverrideProps) => {
  // get ref of child element
  const childRef = useRef<HTMLDivElement>(null);

  console.log('childRef', children);

  for (const selector of Object.keys(sx)) {
    const style = sx[selector];

    childRef.current?.shadowRoot
      ?.querySelector(selector)
      ?.setAttribute('style', styleToString(style));
  }

  return <children.type ref={childRef} {...children.props} />;
};
