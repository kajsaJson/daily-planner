import type { JSX, PointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'src/components/Button.tsx';
import { Note } from 'src/components/Note.tsx';
import { TimePicker } from 'src/components/TimePicker.tsx';
import { CloseSmallIcon } from 'src/components/icons/CloseSmallIcon.tsx';
import { IMPASSIVE } from 'src/constants/eventListenerOptions/IMPASSIVE.ts';
import type { PlannerEntry } from 'src/data/PlannerEntry.d.ts';
import type { HourMinute } from 'src/types/HourMinute.d.ts';
import type { PlannerNote } from 'src/types/PlannerNote.d.ts';
import type { Position } from 'src/types/Position.d.ts';
import { moveItemWithin } from 'src/utils/moveItemWithin.ts';
import { positionBasedOnPointer } from 'src/utils/positionBasedOnPointer.ts';

export type TimeSlotProps = {
  readonly plannerEntry: PlannerEntry;
  readonly updateTimeEntry: (time: HourMinute, notes: PlannerNote[]) => void;
  readonly removeTimeEntry: () => void;
};

export const TimeSlot = ({ plannerEntry, updateTimeEntry, removeTimeEntry }: TimeSlotProps): JSX.Element => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastX, setLastX] = useState<number>(0);

  const noteContainerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current: noteContainerElement } = noteContainerRef;

    if (!noteContainerElement) return;

    const handleTouchStart = (event: TouchEvent): void => {
      const { touches } = event;

      const [touch] = touches;

      const { clientX } = touch;

      setLastX((): number => {
        return clientX;
      });
    };

    const handleTouchMove = (event: TouchEvent): void => {
      if (!isDragging) return;

      event.preventDefault();

      const { touches } = event;

      const [touch] = touches;

      const { clientX } = touch;

      const currentX = clientX;

      const deltaX = currentX - lastX;

      noteContainerElement.scrollLeft += deltaX;

      setLastX((): number => {
        return currentX;
      });
    };

    const handlePointerDown = (event: globalThis.PointerEvent): void => {
      const { clientX } = event;

      setLastX((): number => {
        return clientX;
      });
    };

    const handlePointerMove = (event: globalThis.PointerEvent): void => {
      if (!isDragging) return;

      const { clientX, clientY } = event;

      // Scroll while dragging
      const currentX = clientX;

      const deltaX = currentX - lastX;

      noteContainerElement.scrollLeft += deltaX;

      setLastX((): number => {
        return currentX;
      });

      // Ghost note effect
      const elementsUnderPointer = document.elementsFromPoint(clientX, clientY);

      if (!elementsUnderPointer.includes(noteContainerElement)) return;

      const { current: ghostElement } = ghostRef;

      if (!ghostElement) return;

      const { offsetY, pageY } = event;

      const { offsetWidth, offsetHeight } = ghostElement;

      const { x } = positionBasedOnPointer({
        clientX,
        clientY,
        offsetY,
        pageY,
        offsetWidth,
        offsetHeight,
      });

      ghostElement.style.left = `${x}px`;
    };

    noteContainerElement.addEventListener('touchstart', handleTouchStart, IMPASSIVE);
    noteContainerElement.addEventListener('touchmove', handleTouchMove, IMPASSIVE);
    noteContainerElement.addEventListener('pointerdown', handlePointerDown, IMPASSIVE);
    noteContainerElement.addEventListener('pointermove', handlePointerMove, IMPASSIVE);

    return (): void => {
      noteContainerElement.removeEventListener('touchstart', handleTouchStart, IMPASSIVE);
      noteContainerElement.removeEventListener('touchmove', handleTouchMove, IMPASSIVE);
      noteContainerElement.removeEventListener('pointerdown', handlePointerDown, IMPASSIVE);
      noteContainerElement.removeEventListener('pointermove', handlePointerMove, IMPASSIVE);
    };
  }, [isDragging, lastX]);

  const { time, notes } = plannerEntry;

  const addNote = (): void => {
    updateTimeEntry(
      //
      time,
      [
        ...notes,
        {
          text: '',
          color: 'var(--main-2)',
        },
      ],
    );
  };

  return (
    <>
      <div
        style={{
          height: 'auto',
          display: 'flex',
          gap: '0.375rem',
          maxWidth: '100%',
          width: 'min-content',
          alignItems: 'center',
          position: 'relative',
          paddingBlock: '0.375rem',
          borderRadius: '0 0.375rem 0.375rem 0',
          paddingInline: '0.375rem',
          boxShadow: 'var(--box-shadow)',
          backgroundColor: 'var(--main-1)',
        }}
      >
        <Button
          style={{
            top: '-0.4rem',
            display: 'flex',
            width: '0.8rem',
            height: '0.8rem',
            right: '-0.4rem',
            color: 'var(--txt)',
            alignItems: 'center',
            position: 'absolute',
            borderRadius: '9999px',
            justifyContent: 'center',
            boxShadow: 'var(--box-shadow)',
            backgroundColor: 'var(--main-1)',
          }}
          onClick={removeTimeEntry}
        >
          <CloseSmallIcon
            style={{
              width: '100%',
              height: '100%',
              fill: 'var(--txt)',
            }}
          />
        </Button>
        <TimePicker
          plannerEntry={plannerEntry}
          updateTimeEntry={updateTimeEntry}
        />
        <div
          ref={noteContainerRef}
          style={{
            width: '100%',
            display: 'flex',
            gap: '0.375rem',
            overflowX: 'auto',
            overflowY: 'unset',
            touchAction: 'pan-x',
            alignItems: 'flex-start',
            borderRadius: '0.375rem',
            justifyContent: 'flex-start',
          }}
        >
          {notes.map((note: PlannerNote, index: number): JSX.Element => {
            const updateNote = (toNote: PlannerNote): void => {
              notes[index] = toNote;

              updateTimeEntry(
                //
                time,
                [...notes],
              );
            };

            const removeNote = (): void => {
              updateTimeEntry(
                //
                time,
                notes.filter((_: PlannerNote, i: number): boolean => {
                  const result = i !== index;

                  return result;
                }),
              );
            };

            const updateNoteIndex = (event: PointerEvent<HTMLDivElement>): void => {
              const { currentTarget: noteElement, pageX, pageY } = event;

              const { parentElement } = noteElement;

              if (!parentElement) return;

              const elementsUnderPointer = document.elementsFromPoint(pageX, pageY);

              const { scrollX, scrollY } = window;

              const children = [...parentElement.children] as const;

              const elementUnderPointer = elementsUnderPointer //
                .filter((elementUnderPointer: Element): boolean => {
                  return children.includes(elementUnderPointer);
                })
                .filter((elementUnderPointer: Element): boolean => {
                  return elementUnderPointer !== noteElement;
                })
                .find((elementUnderPointer: Element): boolean => {
                  const { left, top, width, height } = elementUnderPointer.getBoundingClientRect();

                  const fromX = left + scrollX;
                  const fromY = top + scrollY;

                  const toX = fromX + width;
                  const toY = fromY + height;

                  // prettier-ignore
                  return (
                    fromX <= pageX && toX >= pageX &&
                    fromY <= pageY && toY >= pageY
                  );
                });

              if (!elementUnderPointer) return;

              const toIndex = children.indexOf(elementUnderPointer);

              const changedNotes = moveItemWithin(notes, index, toIndex);

              if (notes === changedNotes) return;

              updateTimeEntry(
                //
                time,
                changedNotes,
              );
            };

            const handleIsDragging = (to: boolean, at: Position): void => {
              const { current: ghostElement } = ghostRef;

              if (!ghostElement) return;

              const { x } = at;

              ghostElement.style.left = `${x}px`;

              setIsDragging(to);
            };

            return (
              <Note
                key={index}
                note={note}
                isDragging={isDragging}
                setIsDragging={handleIsDragging}
                updateNote={updateNote}
                updateNoteIndex={updateNoteIndex}
                removeNote={removeNote}
              />
            );
          })}
        </div>
        <Button
          onClick={addNote}
          style={{
            borderRadius: '0.125em',
            paddingInline: '0.125em',
            color: 'var(--accent-7)',
          }}
        >
          Add Note
        </Button>
        <div
          ref={ghostRef}
          style={{
            top: '25%',
            opacity: '50%',
            height: '30px',
            width: '100px',
            position: 'absolute',
            borderRadius: '0.1875rem',
            backgroundColor: 'var(--accent-5)',
            visibility: isDragging ? 'visible' : 'hidden',
          }}
        ></div>
      </div>
    </>
  );
};
