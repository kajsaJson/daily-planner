import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { IMPASSIVE } from 'src/constants/eventListenerOptions/IMPASSIVE.ts';
import { createTimeTrio } from 'src/systems/PlannerEntry/createTimeTrio.ts';
import type { HourOption } from 'src/types/HourOption.d.ts';
import type { MinuteOption } from 'src/types/MinuteOption.d.ts';
import type { TimeTrio } from 'src/types/TimeTrio.d.ts';
import type { Direction } from 'src/types/WheelDirection.d.ts';

export type CombinationDiscProps<T extends HourOption | MinuteOption> = {
  readonly options: readonly T[];
  readonly timeTrio: TimeTrio<T>;
  readonly onTrioChange: (newTrio: TimeTrio<T>) => void;
};

export const CombinationDisc = <const T extends HourOption | MinuteOption>({
  options,
  timeTrio,
  onTrioChange,
}: CombinationDiscProps<T>): JSX.Element => {
  const [startY, setStartY] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { previousValue, value, nextValue } = timeTrio;

  useEffect(() => {
    const { current } = containerRef;

    if (!current) return;

    const handleTouchStart = (event: TouchEvent): void => {
      const { touches } = event;

      const [touch] = touches;

      const { clientY } = touch;

      setStartY((): number => {
        return clientY;
      });
    };

    const handleTouchMove = (event: TouchEvent): void => {
      event.preventDefault();

      if (startY === -1) return;

      const { touches } = event;

      const [touch] = touches;

      const { clientY } = touch;

      const deltaY = Math.abs(clientY - startY);

      const threshold: number = 10;

      if (deltaY > threshold) {
        const direction: Direction = clientY < startY ? 'up' : 'down';

        const toValue = direction === 'down' ? previousValue : nextValue;

        onTrioChange(createTimeTrio(toValue, options));

        setStartY((): number => {
          return clientY;
        });
      }
    };

    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();

      const { deltaY } = event;

      const direction: Direction = deltaY < 0 ? 'up' : 'down';

      const toValue = direction === 'up' ? previousValue : nextValue;

      onTrioChange(createTimeTrio(toValue, options));
    };

    current.addEventListener('touchstart', handleTouchStart, IMPASSIVE);
    current.addEventListener('touchmove', handleTouchMove, IMPASSIVE);
    current.addEventListener('wheel', handleWheel, IMPASSIVE);

    return (): void => {
      current.removeEventListener('touchstart', handleTouchStart, IMPASSIVE);
      current.removeEventListener('touchmove', handleTouchMove, IMPASSIVE);
      current.removeEventListener('wheel', handleWheel, IMPASSIVE);
    };
  }, [nextValue, onTrioChange, options, previousValue, startY]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          gap: '0.375rem',
          fontSize: '1.1rem',
          userSelect: 'none',
          textAlign: 'center',
          position: 'relative',
          alignItems: 'center',
          paddingInline: '0.1rem',
          flexDirection: 'column',
          borderRadius: '0.125rem',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '1.8rem',
            height: '1.8rem',
            textAlign: 'center',
            alignItems: 'center',
            color: 'var(--main-7)',
            borderRadius: '9999px',
            justifyContent: 'center',
            backgroundColor: 'var(--main-2)',
            boxShadow: 'var(--box-shadow), inset 15px 15px 55px -55px var(--accent-6)',
          }}
        >
          {previousValue}
        </div>
        <div
          style={{
            width: '2rem',
            height: '2rem',
            display: 'flex',
            fontSize: '1.5rem',
            textAlign: 'center',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '9999px',
            justifyContent: 'center',
            backgroundColor: 'var(--main-1)',
          }}
        >
          {value}
          <div
            style={{
              width: '2.2rem',
              height: '2.2rem',
              position: 'absolute',
              borderStyle: 'solid',
              pointerEvents: 'none',
              borderWidth: '0.2rem',
              borderRadius: '9999px',
              top: 'calc(50% - 1.1rem)',
              left: 'calc(50% - 1.1rem)',
              borderColor: 'var(--accent-5)',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            width: '1.8rem',
            height: '1.8rem',
            textAlign: 'center',
            alignItems: 'center',
            color: 'var(--main-7)',
            borderRadius: '9999px',
            justifyContent: 'center',
            backgroundColor: 'var(--main-2)',
            boxShadow: 'var(--box-shadow), inset 15px 15px 55px -55px var(--accent-6)',
          }}
        >
          {nextValue}
        </div>
      </div>
    </>
  );
};
