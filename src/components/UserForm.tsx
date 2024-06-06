import type { ChangeEvent, JSX } from 'react';
import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/Button.tsx';
import { getWindowDimensions } from 'src/systems/getWindowDimensions.ts';
import type { UserFormData } from 'src/types/UserFormData.d.ts';

export type UserFormProps = {
  readonly onClick: (userFormData: UserFormData) => void;
  readonly titleText: string;
  readonly isError?: boolean;
  readonly buttonText: string;
  readonly linkText: string;
  readonly linkPath: string;
};

export const UserForm = ({
  onClick,
  titleText,
  isError,
  buttonText,
  linkText,
  linkPath,
}: UserFormProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useLayoutEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (event: MouseEvent): void => {
    if (!email || !password) return;

    onClick({
      event,
      email,
      password,
    });
  };

  const handleChangeEmail = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;

    setEmail((): string => {
      return value;
    });
  };

  const handleChangePassword = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;

    setPassword((): string => {
      return value;
    });
  };

  const { windowWidth, windowHeight } = windowDimensions;

  return (
    <>
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          width: windowWidth < 500 ? '100%' : '20rem',
          height: windowHeight < 500 ? '100%' : '20rem',
          fontSize: '0.9rem',
          color: 'var(--txt)',
          alignItems: 'center',
          paddingInline: '1rem',
          flexDirection: 'column',
          borderRadius: '0.375rem',
          justifyContent: 'space-around',
          backgroundColor: 'var(--main-2)',
          boxShadow: 'var(--module-shadow)',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontWeight: '600',
            color: isError ? 'var(--error)' : 'var(--txt)',
          }}
        >
          {titleText}
        </p>
        <form
          style={{
            gap: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <input
            style={{
              width: '100%',
              border: 'none',
              fontSize: '1rem',
              color: 'var(--txt)',
              padding: '0.375rem',
              borderRadius: '0.125rem',
              backgroundColor: 'var(--main-1)',
            }}
            type={'email'}
            id={'email'}
            value={email}
            autoComplete={'current-password'}
            placeholder={'example@example.com'}
            onChange={handleChangeEmail}
          ></input>
          <input
            style={{
              width: '100%',
              border: 'none',
              fontSize: '1rem',
              color: 'var(--txt)',
              padding: '0.375rem',
              borderRadius: '0.125rem',
              backgroundColor: 'var(--main-1)',
            }}
            type={'password'}
            id={'password'}
            value={password}
            autoComplete={'new-password'}
            placeholder={'password'}
            onChange={handleChangePassword}
          ></input>
          <Button
            isDisabled={!email || !password}
            onClick={handleClick}
            style={{
              width: '100%',
              height: '2.75rem',
              color: 'var(--txt)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--accent-5)',
            }}
          >
            {buttonText}
          </Button>
        </form>
        <Link
          className={'link-style'}
          to={linkPath}
        >
          {linkText}
        </Link>
      </div>
    </>
  );
};
