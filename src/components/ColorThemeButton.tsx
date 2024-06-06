import type { JSX } from 'react';
import { Button } from 'src/components/Button.tsx';
import { DarkModeIcon } from 'src/components/icons/DarkModeIcon.tsx';
import { LightModeIcon } from 'src/components/icons/LightModeIcon.tsx';
import { useUserProfileState } from 'src/state/useUserProfileState.ts';
import { toggleColorTheme } from 'src/utils/toggleColorTheme.ts';

export type ColorThemeButtonProps = {
  readonly [key in PropertyKey]: never;
};

export const ColorThemeButton = ({}: ColorThemeButtonProps): JSX.Element => {
  const { userProfile, setColorTheme } = useUserProfileState();
  const { preferences } = userProfile;
  const { colorTheme } = preferences;

  const handleOnClick = (): void => {
    setColorTheme(toggleColorTheme(colorTheme));
  };

  return (
    <>
      <Button
        style={{
          display: 'flex',
          width: '1.5rem',
          height: '1.5rem',
          alignItems: 'center',
          borderRadius: '9999px',
          justifyContent: 'center',
        }}
        onClick={handleOnClick}
      >
        <div
          style={{
            fontWeight: 300,
            width: '1.3rem',
            height: '1.3rem',
            fontStyle: 'normal',
            color: 'var(--txt)',
            fontStretch: 'condensed',
            fontOpticalSizing: 'auto',
            filter: 'grayscale(1) drop-shadow(0 0 1px var(--accent-5))',
          }}
        >
          {colorTheme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </div>
      </Button>
    </>
  );
};
