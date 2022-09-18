const times = [...new Array(109)].map((e, i) => {
  const hour = (Math.floor(i * 5 / 60) + 8) % 12 || 12;
  const min = `0${i * 5 % 60}`;
  return {
    value: i * 5,
    label: `${hour}:${min.slice(-2)}`
  };
});

const durations = [...new Array(108)].map((e, i) => {
  const value = (i + 1) * 5;
  const hour = Math.floor(value / 60);
  const min = `0${value % 60}`;
  return {
    value,
    label: `${hour}:${min.slice(-2)}`
  };
});
