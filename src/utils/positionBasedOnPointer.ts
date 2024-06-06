import { getWindowDimensions } from 'src/systems/getWindowDimensions.ts';
import type { PointerPosition } from 'src/types/PointerPosition.d.ts';
import type { Position } from 'src/types/Position.d.ts';

export const positionBasedOnPointer = (pointerPosition: PointerPosition): Position => {
  const { offsetWidth, offsetHeight } = pointerPosition;

  const elementWidth = offsetWidth || 0;
  const elementHeight = offsetHeight || 0;

  const { clientX, clientY, pageY, offsetY } = pointerPosition;

  let x: number = clientX;
  let y: number = clientY;

  const { windowWidth, windowHeight } = getWindowDimensions();

  if (clientX + elementWidth > windowWidth) {
    x -= elementWidth;
  }

  if (clientY + elementHeight > windowHeight) {
    y -= elementHeight;
  }

  y -= pageY;

  y += offsetY;

  return {
    x,
    y,
  };
};
