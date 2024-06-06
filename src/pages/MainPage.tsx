import type { JSX } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Button.tsx';
import { ColorThemeButton } from 'src/components/ColorThemeButton.tsx';
import { TimeSlot } from 'src/components/TimeSlot.tsx';
import { PATH_ROOT } from 'src/constants/router/ROUTER.tsx';
import { PlannerEntry } from 'src/data/PlannerEntry.ts';
import { useUserProfileState } from 'src/state/useUserProfileState.ts';
import { plannerEntriesByDate } from 'src/systems/PlannerEntry/plannerEntriesByDate.ts';
import { removeJsonWebToken } from 'src/systems/UserProfile/removeJsonWebToken.ts';
import type { HourMinute } from 'src/types/HourMinute.d.ts';
import type { PlannerNote } from 'src/types/PlannerNote.d.ts';
import { toFalse } from 'src/utils/toFalse.ts';
import { toTrue } from 'src/utils/toTrue.ts';

export const MainPage = (): JSX.Element => {
  const { setPlannerEntries, userProfile } = useUserProfileState();
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const navigate = useNavigate();

  const { plannerEntries } = userProfile;

  const addPlannerEntry = (): void => {
    setPlannerEntries(
      [
        //
        ...plannerEntries,
        new PlannerEntry('--:--', []),
      ].sort(plannerEntriesByDate),
    );
  };

  const clearPlannerEntries = (): void => {
    setIsModalShowing(toFalse);

    setPlannerEntries([]);
  };

  const showClearPlannerEntriesModal = (): void => {
    setIsModalShowing(toTrue);
  };

  const hideClearPlannerEntriesModal = (): void => {
    setIsModalShowing(toFalse);
  };

  const handleLogOutUser = (): void => {
    removeJsonWebToken();

    navigate(PATH_ROOT);
  };

  const hasPlannerEntries = Boolean(plannerEntries.length);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '0.375rem',
          overflow: 'hidden',
          flexDirection: 'column',
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
          <Button
            onClick={addPlannerEntry}
            style={{
              height: '1.5rem',
              borderRadius: '0.125rem',
              color: 'var(--accent-7)',
              paddingInline: '0.375rem',
            }}
          >
            Add Entry
          </Button>
          <Button
            style={{
              height: '1.25rem',
              borderRadius: '0.125rem',
              color: 'var(--accent-7)',
              paddingInline: '0.375rem',
              pointerEvents: hasPlannerEntries ? 'unset' : 'none',
              visibility: hasPlannerEntries ? 'visible' : 'hidden',
            }}
            onClick={showClearPlannerEntriesModal}
          >
            Clear All
          </Button>
          <ColorThemeButton />
          <Button
            style={{
              height: '1.5rem',
              borderRadius: '0.125rem',
              color: 'var(--accent-7)',
              paddingInline: '0.375rem',
            }}
            onClick={handleLogOutUser}
          >
            Log Out
          </Button>
        </header>
        <div
          style={{
            height: '100%',
            display: 'flex',
            overflowY: 'auto',
            alignItems: 'center',
            paddingInline: '0.5rem',
            borderRadius: '0.375rem',
            paddingBlockEnd: '0.5rem',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              gap: '0.75rem',
              display: 'flex',
              overflowX: 'hidden',
              paddingBlock: '0.5rem',
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderRadius: '0.375rem',
              paddingInlineEnd: '0.5rem',
              backgroundColor: 'var(--main-2)',
            }}
          >
            {plannerEntries.map((plannerEntry: PlannerEntry, index: number): JSX.Element => {
              const updateTimeEntry = (time: HourMinute, notes: PlannerNote[]): void => {
                plannerEntry.time = time;
                plannerEntry.notes = notes;

                setPlannerEntries(
                  [
                    //
                    ...plannerEntries,
                  ].sort(plannerEntriesByDate),
                );
              };

              const removeTimeEntry = (): void => {
                setPlannerEntries(
                  plannerEntries.filter((currentTimeEntry: PlannerEntry): boolean => {
                    return plannerEntry !== currentTimeEntry;
                  }),
                );
              };

              return (
                <TimeSlot
                  key={index}
                  plannerEntry={plannerEntry}
                  updateTimeEntry={updateTimeEntry}
                  removeTimeEntry={removeTimeEntry}
                />
              );
            })}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            gap: '0.125rem',
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            backdropFilter: 'blur(1px)',
            visibility: isModalShowing ? 'visible' : 'hidden',
          }}
        >
          <dialog
            style={{
              gap: '1rem',
              border: 'none',
              zIndex: '1000',
              display: 'flex',
              maxWidth: '100%',
              paddingInline: '1rem',
              paddingBlock: '0.5rem',
              fontSize: '0.9rem',
              minHeight: '8rem',
              color: 'var(--txt)',
              position: 'relative',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: '0.375rem',
              backdropFilter: 'blur(5px)',
              backgroundColor: 'var(--main-alt-4)',
              visibility: isModalShowing ? 'visible' : 'hidden',
              boxShadow: 'var(--module-shadow), var(--box-shadow)',
            }}
          >
            <p>Are you sure you want to delete all entries?</p>
            <p
              style={{
                fontWeight: '500',
              }}
            >
              This action is irreversible.
            </p>
            <div
              style={{
                gap: '1rem',
                width: '100%',
                display: 'flex',
              }}
            >
              <Button
                style={{
                  width: '100%',
                  color: 'var(--txt)',
                  borderRadius: '0.125rem',
                  paddingInline: '0.375rem',
                  backgroundColor: 'var(--main-alt-1)',
                }}
                onClick={hideClearPlannerEntriesModal}
              >
                No, keep
              </Button>
              <Button
                style={{
                  width: '100%',
                  minHeight: '1.2rem',
                  color: 'var(--txt)',
                  borderRadius: '0.125rem',
                  paddingInline: '0.375rem',
                  backgroundColor: 'var(--main-alt-1)',
                }}
                onClick={clearPlannerEntries}
              >
                Yes, delete
              </Button>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
};
