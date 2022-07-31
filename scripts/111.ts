// import clipboard from 'clipboard';
const { default: clipboard } = await import('clipboardy');
// import('clipboardy').then(({ default: clipboard }) => {
/* 
    one tow three
    一 二 三
  */
const i18n_prefix = 'test.sciprt';
// @ts-ignore
const str = clipboard.readSync();
const [keys, titles = keys] = str.split(/\n/).map((item) => item.trim().split(/\s+/));
console.log(keys, titles);

const cols = keys.map((dataIndex, index) => {
  const title = titles[index] ?? dataIndex;
  const width = 14 * title.length + 2;
  return {
    dataIndex,
    title: `${i18n_prefix}.${dataIndex}`,
    width,
  };
});
const result = JSON.stringify(cols)
  .replace(/"title":\s*(\S+?),/g, 'title: t($1),')
  .replace(/([{])/g, '\n$1')
  .replace(/(,)/g, '$1 ');
console.table(result);

clipboard.writeSync(result);

export default {};
// });
