import type { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'src/components/Button.tsx';
import { TimePickerMenu } from 'src/components/TimePickerMenu.tsx';
import { CAPTURE_PASSIVE } from 'src/constants/eventListenerOptions/CAPTURE_PASSIVE.ts';
import type { PlannerEntry } from 'src/data/PlannerEntry.d.ts';
import { splitHourMinute } from 'src/systems/PlannerEntry/splitHourMinute.ts';
import type { HourMinute } from 'src/types/HourMinute.d.ts';
import type { HourOption } from 'src/types/HourOption.d.ts';
import type { MinuteOption } from 'src/types/MinuteOption.d.ts';
import type { PlannerNote } from 'src/types/PlannerNote.d.ts';
import type { Position } from 'src/types/Position.d.ts';
import { positionBasedOnPointer } from 'src/utils/positionBasedOnPointer.ts';
import { toToggled } from 'src/utils/toToggled.ts';

export type TimePickerProps = {
  readonly plannerEntry: PlannerEntry;
  readonly updateTimeEntry: (time: HourMinute, notes: PlannerNote[]) => void;
};

export const TimePicker = ({ plannerEntry, updateTimeEntry }: TimePickerProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<Position>({ x: 0, y: 0 });

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const { target } = event;

      const { current } = dialogRef;

      if (!isMenuOpen || (target instanceof HTMLElement && current?.contains(target))) return;

      setIsMenuOpen(toToggled);

      event.stopPropagation();
    };

    if (isMenuOpen) {
      window.addEventListener(
        //
        'click',
        handleClickOutside,
        CAPTURE_PASSIVE,
      );
    }

    return (): void => {
      window.removeEventListener(
        //
        'click',
        handleClickOutside,
        CAPTURE_PASSIVE,
      );
    };
  }, [isMenuOpen]);

  const { time, notes } = plannerEntry;

  const handleTimeChange = (hour: HourOption, minute: MinuteOption): void => {
    setIsMenuOpen(toToggled);

    if (hour === '--' || minute === '--') return;

    updateTimeEntry(`${hour}:${minute}`, notes);
  };

  const handleOnClickButton = (event: MouseEvent): void => {
    setIsMenuOpen(toToggled);

    const { current: dialogElement } = dialogRef;

    if (!dialogElement) return;

    const { offsetWidth, offsetHeight } = dialogElement;

    const { clientX, clientY, offsetY, pageY } = event;

    const position = positionBasedOnPointer({
      clientX,
      clientY,
      offsetY,
      pageY,
      offsetWidth,
      offsetHeight,
    });

    setMenuPosition((): Position => {
      return position;
    });
  };

  const { hour, minute } = splitHourMinute(time);

  return (
    <>
      <div
        style={{
          height: '100%',
          display: 'flex',
          position: 'relative',
          alignItems: 'flex-start',
        }}
      >
        <Button
          style={{
            width: '3rem',
            height: '3rem',
            fontSize: '1.1rem',
            borderRadius: '9999px',
            color: 'var(--accent-7)',
            backgroundColor: 'var(--main-1)',
            boxShadow: 'var(--box-shadow), inset 15px 15px 55px -55px var(--accent-6)',
          }}
          onClick={handleOnClickButton}
        >
          {time}
        </Button>
        <TimePickerMenu
          ref={dialogRef}
          onTimeChange={handleTimeChange}
          isMenuOpen={isMenuOpen}
          hour={hour}
          minute={minute}
          menuPosition={menuPosition}
        />
      </div>
    </>
  );
};
