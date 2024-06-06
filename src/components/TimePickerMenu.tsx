import type { ForwardedRef, JSX } from 'react';
import { forwardRef, useState } from 'react';
import { Button } from 'src/components/Button.tsx';
import { CombinationDisc } from 'src/components/CombinationDisc.tsx';
import { HOUR_OPTIONS } from 'src/constants/HOUR_OPTIONS.ts';
import { MINUTE_OPTIONS } from 'src/constants/MINUTE_OPTIONS.ts';
import { createTimeTrio } from 'src/systems/PlannerEntry/createTimeTrio.ts';
import type { HourOption } from 'src/types/HourOption.d.ts';
import type { MinuteOption } from 'src/types/MinuteOption.d.ts';
import type { Position } from 'src/types/Position.d.ts';
import type { TimeTrio } from 'src/types/TimeTrio.d.ts';

export type TimePickerMenuProps = {
  readonly onTimeChange: (hour: HourOption, minute: MinuteOption) => void;
  readonly isMenuOpen: boolean;
  readonly hour: HourOption;
  readonly minute: MinuteOption;
  readonly menuPosition: Position;
};

export const TimePickerMenu = forwardRef<HTMLDialogElement, TimePickerMenuProps>(
  (
    { onTimeChange, isMenuOpen, hour, minute, menuPosition }: TimePickerMenuProps,
    ref: ForwardedRef<HTMLDialogElement>,
  ): JSX.Element => {
    const [hourTrio, setHourTrio] = useState((): TimeTrio<HourOption> => {
      return createTimeTrio(hour, HOUR_OPTIONS);
    });
    const [minuteTrio, setMinuteTrio] = useState((): TimeTrio<MinuteOption> => {
      return createTimeTrio(minute, MINUTE_OPTIONS);
    });

    const handleOnClickButton = (): void => {
      const { value: hour } = hourTrio;
      const { value: minute } = minuteTrio;

      onTimeChange(hour, minute);
    };

    return (
      <>
        <dialog
          ref={ref}
          aria-modal={'true'}
          style={{
            gap: '1rem',
            border: 'none',
            zIndex: '1000',
            display: 'flex',
            padding: '0.5rem',
            top: menuPosition.y,
            color: 'var(--txt)',
            alignItems: 'center',
            left: menuPosition.x,
            position: 'absolute',
            flexDirection: 'column',
            borderRadius: '0.375rem',
            backdropFilter: 'blur(2px)',
            boxShadow: 'var(--module-shadow)',
            backgroundColor: 'var(--accent-alt-3)',
            visibility: isMenuOpen ? 'visible' : 'hidden',
          }}
        >
          <div
            style={{
              gap: '0.5rem',
              display: 'flex',
            }}
          >
            <CombinationDisc
              options={HOUR_OPTIONS}
              onTrioChange={setHourTrio}
              timeTrio={hourTrio}
            />
            <div
              style={{
                display: 'flex',
                cursor: 'default',
                fontSize: '1.5rem',
                userSelect: 'none',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              :
            </div>
            <CombinationDisc
              options={MINUTE_OPTIONS}
              onTrioChange={setMinuteTrio}
              timeTrio={minuteTrio}
            />
          </div>
          <Button
            style={{
              color: 'var(--txt)',
              borderRadius: '0.125rem',
              paddingInline: '0.375rem',
              backgroundColor: 'var(--main-1)',
            }}
            onClick={handleOnClickButton}
            isDisabled={hourTrio.value === '--' || minuteTrio.value === '--'}
          >
            Set Time
          </Button>
        </dialog>
      </>
    );
  },
);
