import { API_ROUTE_SIGNUP } from 'backend/constants/API_ROUTES.ts';
import type { JSX } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorThemeButton } from 'src/components/ColorThemeButton.tsx';
import { UserForm } from 'src/components/UserForm.tsx';
import { API_ORIGIN } from 'src/constants/API_ORIGIN.ts';
import { PATH_LOGIN, PATH_MAIN } from 'src/constants/router/ROUTER.tsx';
import { useUserProfileState } from 'src/state/useUserProfileState.ts';
import type { ServerMessage } from 'src/types/ServerMessage.d.ts';
import type { UserCredentials } from 'src/types/UserCredentials.d.ts';
import type { UserFormData } from 'src/types/UserFormData.d.ts';
import { toTrue } from 'src/utils/toTrue.ts';

export const SignUpPage = (): JSX.Element => {
  const [uxText, setUxText] = useState<string>(`Let's get started!`);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUserProfile } = useUserProfileState();

  const handleOnClick = async ({ email, password }: UserFormData): Promise<void> => {
    try {
      const userCredentials: UserCredentials = {
        email,
        password,
      };

      const response = await window.fetch(
        //
        `${API_ORIGIN}${API_ROUTE_SIGNUP}`,
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

      if (status === 'user already exists') {
        setUxText((): string => {
          return `You already have an existing account.`;
        });

        setIsError(toTrue);

        console.error(serverMessage);

        return;
      }

      if (status === 'ok') {
        const { data: userProfile } = serverMessage;

        setUserProfile(userProfile);

        navigate(PATH_MAIN);
      }
    } catch (error) {
      console.error(error);
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
          titleText={uxText}
          buttonText={`Sign Up`}
          linkText={`Already have an account?`}
          linkPath={PATH_LOGIN}
          onClick={handleOnClick}
        />
      </div>
    </>
  );
};
