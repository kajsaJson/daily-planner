import type { JSX } from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { PASSIVE } from 'src/constants/eventListenerOptions/PASSIVE.ts';
import { ROUTER } from 'src/constants/router/ROUTER.tsx';
import { useExpandedNoteMenuState } from 'src/state/useExpandedNoteMenuState.ts';
import { useUserProfileState } from 'src/state/useUserProfileState.ts';
import { toggleColorTheme } from 'src/utils/toggleColorTheme.ts';

export const App = (): JSX.Element => {
  const { closeExpandedNoteMenu } = useExpandedNoteMenuState();

  const { userProfile } = useUserProfileState();
  const { preferences } = userProfile;
  const { colorTheme } = preferences;

  useEffect((): void => {
    const handleClick = (): void => {
      closeExpandedNoteMenu();
    };

    window.addEventListener('click', handleClick, PASSIVE);
    window.addEventListener('scroll', handleClick, PASSIVE);
  }, [closeExpandedNoteMenu]);

  useLayoutEffect((): void => {
    const { body } = document;

    body.classList.remove(toggleColorTheme(colorTheme));
    body.classList.add(colorTheme);
  }, [colorTheme]);

  return (
    <>
      <RouterProvider router={ROUTER} />
    </>
  );
};
