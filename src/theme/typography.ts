import { Platform } from 'react-native';

export const typography = {
  title: 28,
  heading: 20,
  body: 15,
  caption: 13,
  displayFont: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }),
  bodyFont: Platform.select({
    ios: 'Avenir Next',
    android: 'sans-serif-condensed',
    default: 'sans-serif',
  }),
};
