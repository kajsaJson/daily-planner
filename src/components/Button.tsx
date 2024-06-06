import type { CSSProperties, JSX, PointerEvent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { IMPASSIVE } from 'src/constants/eventListenerOptions/IMPASSIVE.ts';

export type ButtonProps = {
  readonly children?: ReactNode;
  readonly style?: CSSProperties;
  readonly onClick: (event: MouseEvent) => void;
  readonly isDisabled?: boolean;
};

export const Button = ({ children, style, onClick, isDisabled = false }: ButtonProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const { current } = buttonRef;

    if (!current) return;

    const handleClick = (event: MouseEvent): void => {
      event.preventDefault();

      onClick(event);
    };

    current.addEventListener('click', handleClick, IMPASSIVE);

    return (): void => {
      current.removeEventListener('click', handleClick, IMPASSIVE);
    };
  }, [onClick]);

  const handlePointerOver = (event: PointerEvent<HTMLButtonElement>): void => {
    const { currentTarget } = event;

    currentTarget.classList.add('button-hover');
  };

  const handlePointerOut = (event: PointerEvent<HTMLButtonElement>): void => {
    const { currentTarget } = event;

    currentTarget.classList.remove('button-hover');
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>): void => {
    const { currentTarget } = event;

    currentTarget.classList.add('button-hover');
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>): void => {
    const { currentTarget } = event;

    currentTarget.classList.remove('button-hover');
  };

  return (
    <>
      <button
        ref={buttonRef}
        style={{
          border: 'none',
          fontSize: '0.8rem',
          userSelect: 'none',
          color: 'var(--txt)',
          textAlign: 'center',
          fontWeight: 'normal',
          whiteSpace: 'nowrap',
          backgroundColor: 'inherit',
          cursor: isDisabled ? 'default' : 'pointer',
          ...style,
        }}
        className={isDisabled ? 'disabled' : 'button'}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        disabled={isDisabled}
      >
        {children}
      </button>
    </>
  );
};
