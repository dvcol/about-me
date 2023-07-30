export const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

(window as any).color = getRandomColor;
