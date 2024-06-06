import { API_ROUTE_LOGIN } from 'backend/constants/API_ROUTES.ts';
import type { JSX } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorThemeButton } from 'src/components/ColorThemeButton.tsx';
import { UserForm } from 'src/components/UserForm.tsx';
import { API_ORIGIN } from 'src/constants/API_ORIGIN.ts';
import { PATH_MAIN, PATH_SIGNUP } from 'src/constants/router/ROUTER.tsx';
import { useUserProfileState } from 'src/state/useUserProfileState.ts';
import type { ServerMessage } from 'src/types/ServerMessage.d.ts';
import type { UserCredentials } from 'src/types/UserCredentials.d.ts';
import type { UserFormData } from 'src/types/UserFormData.d.ts';
import { toFalse } from 'src/utils/toFalse.ts';
import { toTrue } from 'src/utils/toTrue.ts';

export const LogInPage = (): JSX.Element => {
  const [infoMessage, setInfoMessage] = useState<string>(`Welcome back!`);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUserProfile } = useUserProfileState();

  const handleOnClick = async ({ email, password }: UserFormData): Promise<void> => {
    // Reset error check.
    setIsError(toFalse);

    const userCredentials: UserCredentials = {
      email,
      password,
    };

    const response = await window.fetch(
      //
      `${API_ORIGIN}${API_ROUTE_LOGIN}`,
      {
        method: 'POST',
        body: JSON.stringify(userCredentials, null, 2),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const serverMessage = (await response.json()) as ServerMessage;

    const { status } = serverMessage;

    if (status === 'ok') {
      const { data: userProfile } = serverMessage;

      setUserProfile(userProfile);

      navigate(PATH_MAIN);
    } else {
      setInfoMessage((): string => {
        return status === 'user does not exist'
          ? `No account found with that email address.`
          : status === 'wrong email or password'
            ? `Incorrect email or password, please try again.`
            : `Something went wrong, please try again.`;
      });

      setIsError(toTrue);

      console.error(serverMessage);
    }
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          gap: '0.125rem',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          background: 'radial-gradient(circle, var(--accent-5) 0%, var(--main-1) 100%)',
        }}
      >
        <header
          style={{
            width: '100%',
            display: 'grid',
            paddingInline: '5%',
            justifyItems: 'center',
            paddingBlockStart: '0.5rem',
            backgroundColor: 'transparent',
            gridTemplateColumns: '25%  25vw 1fr 15%',
          }}
        >
          <div></div>
          <div></div>
          <ColorThemeButton />
          <div></div>
        </header>
        <UserForm
          isError={isError}
          titleText={infoMessage}
          buttonText={`Log In`}
          linkText={`Don't already have an account?`}
          linkPath={PATH_SIGNUP}
          onClick={handleOnClick}
        />
      </div>
    </>
  );
};
