import type { MutableRefObject } from 'react';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type Data = {
  readonly expandedNoteMenu: MutableRefObject<HTMLDivElement | null>;
};

export type Actions = {
  readonly setExpandedNoteMenu: (to: MutableRefObject<HTMLDivElement | null>) => void;
  readonly closeExpandedNoteMenu: () => void;
};

export const NULL_REF = {
  current: null,
} as const satisfies MutableRefObject<HTMLDivElement | null>;

export const useExpandedNoteMenuState = create<Data & Actions>(
  combine<Data, Actions>(
    {
      expandedNoteMenu: NULL_REF,
    },
    (set) => {
      return {
        setExpandedNoteMenu: (to: MutableRefObject<HTMLDivElement | null>): void => {
          set((data: Data): Data => {
            const { expandedNoteMenu } = data;

            const { current } = to;

            if (expandedNoteMenu.current === current) return data;

            return {
              expandedNoteMenu: {
                current,
              },
            } as const;
          });
        },

        closeExpandedNoteMenu: (): void => {
          set((data: Data): Data => {
            const { expandedNoteMenu } = data;

            if (expandedNoteMenu.current === null) return data;

            return {
              expandedNoteMenu: NULL_REF,
            } as const;
          });
        },
      };
    },
  ),
);
