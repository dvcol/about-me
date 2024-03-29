export const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export enum Colors {
  primary = '#ff3e00',
  secondary = '#de8952',
  tertiary = '#ddc4a4',
  background = '#2a2b30',
}
