import type { ColorTheme } from 'src/types/ColorTheme.d.ts';

export const toggleColorTheme = (from: ColorTheme): ColorTheme => {
  return from === 'dark' //
    ? 'light'
    : 'dark';
};
