export const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export enum Colors {
  primary = '#ff3e00',
  secondary = '#ffffff',
}
