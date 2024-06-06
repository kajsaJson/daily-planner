import type { CSSProperties, JSX } from 'react';

export type CloseSmallIconProps = {
  readonly style?: CSSProperties;
};

export const CloseSmallIcon = ({ style }: CloseSmallIconProps): JSX.Element => {
  return (
    <>
      <svg
        style={{
          height: '100%',
          width: '100%',
          fill: 'var(--txt)',
          stroke: 'var(--txt)',
          ...style,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z" />
      </svg>
    </>
  );
};
