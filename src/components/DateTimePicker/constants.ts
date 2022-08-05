export const hoursList = [
  { label: '12', value: '12' },
  { label: '11', value: '11' },
  { label: '10', value: '10' },
  { label: '09', value: '09' },
  { label: '08', value: '08' },
  { label: '07', value: '07' },
  { label: '06', value: '06' },
  { label: '05', value: '05' },
  { label: '04', value: '04' },
  { label: '03', value: '03' },
  { label: '02', value: '02' },
  { label: '01', value: '01' },
];

export const getMinunteList = (): Array<{ label: string; value: string }> => {
  const minuteArray: Array<{ label: string; value: string }> = [];
  for (let count = 59; count >= 0; count -= 1) {
    minuteArray.push({
      label: count.toString().padStart(2, '0'),
      value: count.toString().padStart(2, '0'),
    });
  }
  return minuteArray;
};

export const meridiemList = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
];
