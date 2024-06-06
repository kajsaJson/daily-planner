import { calculateHeightOf } from 'src/systems/Note/calculateHeightOf.ts';

export const forceUpdateHeightOf = (element: HTMLElement): void => {
  // 👇 Force update height.
  element.style.height = 'auto';

  const height = `${calculateHeightOf(element)}px`;

  element.style.height = height;
};
