import { readable } from 'svelte/store';

export const isDarkTheme = (): boolean => window.matchMedia('(prefers-color-scheme: dark)').matches;

export const useMediaQuery = mediaQueryString => {
  // then we return the readable
  return readable(null, set => {
    // we match the media query
    const match = window.matchMedia(mediaQueryString);
    // we set the value of the reader to the matches property
    set(match.matches);
    // we create the event listener that will set the new value on change
    const el = e => set(e.matches);
    // we add the new event listener
    match.addEventListener('change', el);
    // we return the stop function that will clean the event listener
    return () => {
      match.removeEventListener('change', el);
    };
  });
};

export const matchesBreakPoint = (breakpoint: BreakPoints, target = 'max-width') => useMediaQuery(`(${target}: ${breakpoint}px)`);

export enum BreakPoints {
  xs = 300,
  mobile = 600,
  tablet = 900,
  laptop = 1024,
  hd = 1280,
  fhd = 1920,
  qhd = 2560,
  uhd = 3840,
}
