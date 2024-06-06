import type { ChangeEvent, JSX, PointerEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'src/components/Button.tsx';
import { COLORS } from 'src/constants/COLORS.ts';
import { RMB } from 'src/constants/RMB.ts';
import { IMPASSIVE } from 'src/constants/eventListenerOptions/IMPASSIVE.ts';
import { useExpandedNoteMenuState } from 'src/state/useExpandedNoteMenuState.ts';
import type { Color } from 'src/types/Color.d.ts';
import type { PlannerNote } from 'src/types/PlannerNote.d.ts';
import type { PointerPosition } from 'src/types/PointerPosition.d.ts';
import type { Position } from 'src/types/Position.d.ts';
import { forceUpdateHeightOf } from 'src/utils/forceUpdateHeightOf.ts';
import { positionBasedOnPointer } from 'src/utils/positionBasedOnPointer.ts';
import { toFalse } from 'src/utils/toFalse.ts';
import { toTrue } from 'src/utils/toTrue.ts';

// This local state is kept away from React because the timer should never cause renders.
export let LONG_PRESS_TIMER_ID: number = -1;

export type NoteProps = {
  readonly note: PlannerNote;
  readonly isDragging: boolean;
  readonly setIsDragging: (to: boolean, at: Position) => void;
  readonly updateNote: (toNote: PlannerNote) => void;
  readonly updateNoteIndex: (event: PointerEvent<HTMLDivElement>) => void;
  readonly removeNote: () => void;
};

export const Note = ({
  note,
  isDragging,
  setIsDragging,
  updateNote,
  updateNoteIndex,
  removeNote,
}: NoteProps): JSX.Element => {
  const [menuPosition, setMenuPosition] = useState<Position>({ x: 0, y: 0 });
  const [startX, setStartX] = useState<number>(-1);

  const [isLongPress, setIsLongPress] = useState<boolean>(false);

  const { expandedNoteMenu, setExpandedNoteMenu, closeExpandedNoteMenu } = useExpandedNoteMenuState();

  const noteMenuRef = useRef<HTMLDivElement>(null);
  const noteDivRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback(
    (pointerPosition: PointerPosition): void => {
      setExpandedNoteMenu(noteMenuRef);

      const { current: noteMenuElement } = noteMenuRef;

      if (!noteMenuElement) return;

      const position = positionBasedOnPointer(pointerPosition);

      setMenuPosition(position);
    },
    [setExpandedNoteMenu],
  );

  useEffect(() => {
    const { current } = noteDivRef;

    if (!current) return;

    const handleTouchStart = (event: TouchEvent): void => {
      window.clearTimeout(LONG_PRESS_TIMER_ID);

      const { currentTarget, touches } = event;

      const [touch] = touches;

      const { clientX } = touch;

      setStartX((): number => {
        return clientX;
      });

      if (!(currentTarget instanceof HTMLDivElement)) return;

      const { children } = currentTarget;

      const textarea = children[1];

      if (!(textarea instanceof HTMLTextAreaElement)) return;

      LONG_PRESS_TIMER_ID = window.setTimeout((): void => {
        console.log('longpress touch');

        setIsLongPress(toTrue);

        textarea.blur();

        const { clientY } = touch;

        setIsDragging(true, {
          x: clientX,
          y: clientY,
        });
      }, 500);
    };

    const handleTouchMove = (event: TouchEvent): void => {
      window.clearTimeout(LONG_PRESS_TIMER_ID);

      if (!isDragging) return;

      event.preventDefault();
    };

    const handleTouchCancel = (event: TouchEvent): void => {
      window.clearTimeout(LONG_PRESS_TIMER_ID);

      const { touches } = event;

      const [touch] = touches;

      const { clientX, clientY } = touch;

      setIsDragging(false, {
        x: clientX,
        y: clientY,
      });

      setIsLongPress(toFalse);
    };

    const handleTouchEnd = (event: TouchEvent): void => {
      window.clearTimeout(LONG_PRESS_TIMER_ID);

      const { changedTouches } = event;

      const [touch] = changedTouches;

      const { clientX, clientY, pageY } = touch;

      if (isLongPress && !isDragging) {
        const { current: noteMenuElement } = noteMenuRef;

        if (noteMenuElement) {
          const { offsetWidth, offsetHeight } = noteMenuElement;

          handleContextMenu({
            clientX,
            clientY,
            offsetY: 0,
            pageY,
            offsetWidth,
            offsetHeight,
          });
        }

        setIsLongPress(toFalse);
      }

      setIsDragging(false, {
        x: clientX,
        y: clientY,
      });
    };

    current.addEventListener('touchstart', handleTouchStart, IMPASSIVE);
    current.addEventListener('touchmove', handleTouchMove, IMPASSIVE);
    current.addEventListener('touchcancel', handleTouchCancel, IMPASSIVE);
    current.addEventListener('touchend', handleTouchEnd, IMPASSIVE);

    return (): void => {
      current.removeEventListener('touchstart', handleTouchStart, IMPASSIVE);
      current.removeEventListener('touchmove', handleTouchMove, IMPASSIVE);
      current.removeEventListener('touchcancel', handleTouchCancel, IMPASSIVE);
      current.removeEventListener('touchend', handleTouchEnd, IMPASSIVE);
    };
  }, [isLongPress, isDragging, setIsDragging, startX, handleContextMenu]);

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { currentTarget, target } = event;

    if (currentTarget instanceof HTMLTextAreaElement) {
      forceUpdateHeightOf(currentTarget);
    }

    const { value } = target;

    updateNote({
      ...note,
      text: value,
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    const { button, currentTarget, pointerId, pointerType } = event;

    if (button === RMB) return;

    const { children } = currentTarget;

    const textarea = children[1];

    if (!(textarea instanceof HTMLTextAreaElement)) return;

    window.clearTimeout(LONG_PRESS_TIMER_ID);

    LONG_PRESS_TIMER_ID = window.setTimeout((): void => {
      if (pointerType === 'mouse') {
        console.log('longpress mouse');

        currentTarget.style.cursor = 'grabbing';
      }

      textarea.blur();

      currentTarget.setPointerCapture(pointerId);

      const { clientX, clientY } = event;

      setIsDragging(true, {
        x: clientX,
        y: clientY,
      });

      if (!isLongPress) return;

      setIsLongPress(toTrue);
    }, 400);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    const { button, currentTarget, pointerId } = event;

    window.clearTimeout(LONG_PRESS_TIMER_ID);

    currentTarget.style.cursor = 'text';

    const { children } = currentTarget;

    const textarea = children[1];

    if (!(textarea instanceof HTMLTextAreaElement)) return;

    textarea.style.pointerEvents = 'auto';

    currentTarget.releasePointerCapture(pointerId);

    const { current: noteMenuElement } = noteMenuRef;

    if (noteMenuElement) {
      const { offsetWidth, offsetHeight } = noteMenuElement;

      const { nativeEvent } = event;

      const { clientX, clientY, offsetY, pageY } = nativeEvent;

      if (button === RMB) {
        handleContextMenu({
          clientX,
          clientY,
          offsetY,
          pageY,
          offsetWidth,
          offsetHeight,
        });
      }

      if (isLongPress && !isDragging) {
        console.log('open context menu');

        handleContextMenu({
          clientX,
          clientY,
          offsetY,
          pageY,
          offsetWidth,
          offsetHeight,
        });

        setIsLongPress(toFalse);
      }
    }
    if (isDragging) {
      const { clientX, clientY } = event;

      setIsDragging(false, {
        x: clientX,
        y: clientY,
      });
    }

    updateNoteIndex(event);
  };

  const { text, color } = note;

  const { current } = noteMenuRef;

  // prettier-ignore
  const visibility = current && current === expandedNoteMenu.current
    ? 'visible' 
    : 'hidden';

  return (
    <>
      <div
        ref={noteDivRef}
        onContextMenu={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
          event.preventDefault();
        }}
        draggable={false}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          draggable={'false'}
          onContextMenu={closeExpandedNoteMenu}
          ref={noteMenuRef}
          style={{
            gap: '1rem',
            zIndex: '1000',
            display: 'flex',
            padding: '0.5rem',
            position: 'absolute',
            flexDirection: 'column',
            borderRadius: '0.375rem',
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
            backdropFilter: 'blur(2px)',
            justifyContent: 'space-evenly',
            boxShadow: 'var(--module-shadow)',
            backgroundColor: 'var(--accent-alt-3)',
            visibility,
          }}
        >
          <div
            style={{
              width: '100%',
            }}
          >
            <p
              style={{
                paddingBlockEnd: '0.125rem',
                fontSize: '0.9rem',
              }}
            >
              Note color:
            </p>
            <div
              style={{
                display: 'flex',
                gap: '0.357rem',
                justifyContent: 'space-evenly',
              }}
            >
              {COLORS.map((color: Color): JSX.Element => {
                const handleColorChange = (): void => {
                  updateNote({
                    ...note,
                    color,
                  });
                };

                return (
                  <Button
                    key={color}
                    style={{
                      width: '0.9rem',
                      height: '0.9rem',
                      backgroundColor: color,
                      borderRadius: '0.125rem',
                      boxShadow: `inset 50px 50px ${color}`,
                    }}
                    onClick={handleColorChange}
                  ></Button>
                );
              })}
            </div>
          </div>
          <Button
            style={{
              color: 'var(--txt)',
              borderRadius: '0.125rem',
              paddingInline: '0.125rem',
              backgroundColor: 'var(--main-1)',
            }}
            onClick={removeNote}
          >
            Remove note
          </Button>
        </div>
        <textarea
          ref={(element: HTMLTextAreaElement | null): void => {
            if (!element) return;

            forceUpdateHeightOf(element);
          }}
          draggable={false}
          spellCheck={false}
          value={text}
          onChange={handleNoteChange}
          style={{
            resize: 'none',
            border: 'none',
            width: '150px',
            outline: 'none',
            overflow: 'hidden',
            fontSize: '0.9rem',
            color: 'var(--txt)',
            paddingLeft: '0.25rem',
            paddingRight: '0.25rem',
            borderRadius: '0.375rem',
            backgroundColor: `${color}`,
            boxShadow: 'var(--box-shadow)',
            userSelect: isDragging || isLongPress ? 'none' : 'auto',
            pointerEvents: isDragging || isLongPress ? 'none' : 'auto',
          }}
        ></textarea>
      </div>
    </>
  );
};
