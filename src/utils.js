export const userInputPrefix = 'D:\\User\\input ';
export const outputPrefix = 'D:\\Output ';
export const alabasterOutput = 'D:\\UserAlabaster > ';
export const ax7Output = 'D:\\UserAx7 > ';
export const spacer =
  '..........................................................';

export const determineTime = (time) => {
  const now = new Date();
  const then = new Date(time);
  const diff = now - then;
  const minutes = Math.floor(diff / 1000 / 60);
  return minutes;
}