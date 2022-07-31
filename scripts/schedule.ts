import('fs').then(({ readFileSync }) => {
  const schedule = readFileSync('./documents/工程估时.md');
  const evalstring = schedule.toString().match(/\d+/g).join('+');

  const hours = eval(evalstring);
  const days = hours / 8;

  // console.log('hours: ' + hours);
  console.log('days: ' + days);
  console.log('1.5 days: ' + days * 1.5);
});
