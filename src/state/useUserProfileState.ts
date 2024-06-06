import type { PlannerEntry } from 'src/data/PlannerEntry.d.ts';
import { initializeUserProfile } from 'src/systems/UserProfile/initializeUserProfile.ts';
import { saveUserProfile } from 'src/systems/UserProfile/saveUserProfile.ts';
import type { ColorTheme } from 'src/types/ColorTheme.d.ts';
import type { UserProfile } from 'src/types/UserProfile.d.ts';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly userProfile: UserProfile;
};

export type Actions = {
  readonly setUserProfile: (to: UserProfile) => void;
  readonly setColorTheme: (to: ColorTheme) => void;
  readonly setPlannerEntries: (to: readonly PlannerEntry[]) => void;
};

export const useUserProfileState = create<Data & Actions>(
  combine<Data, Actions>(
    {
      userProfile: await initializeUserProfile(),
    } as const,
    (set) => {
      return {
        setUserProfile: (to: UserProfile): void => {
          set((): Data => {
            return {
              userProfile: to,
            } as const;
          });

          // ! 👇 We purposefully do not `await` here.
          void saveUserProfile(to);
        },

        setColorTheme: (to: ColorTheme): void => {
          const { userProfile } = useUserProfileState.getState();

          const { preferences } = userProfile;

          const data: Data = {
            userProfile: {
              ...userProfile,
              preferences: {
                ...preferences,
                colorTheme: to,
              },
            },
          } as const;

          set((): Data => {
            return data;
          });

          const { email } = userProfile;

          // Don't save to database if the user isn't logged in.
          if (!email) return;

          // ! 👇 We purposefully do not `await` here.
          void saveUserProfile(data.userProfile);
        },

        setPlannerEntries: (to: readonly PlannerEntry[]): void => {
          set(({ userProfile }: Data): Data => {
            return {
              userProfile: {
                ...userProfile,
                plannerEntries: to,
              },
            };
          });

          const { userProfile } = useUserProfileState.getState();

          // ! 👇 We purposefully do not `await` here.
          void saveUserProfile(userProfile);
        },
      } as const;
    },
  ),
);
