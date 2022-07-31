const localeIndex = process.argv.indexOf('--locale');
const i18n_prefix = process.argv[localeIndex + 1];

Promise.all([import('json-format'), import('clipboardy')]).then(
  ([{ default: format }, { default: clipboard }]) => {
    const config = {
      type: 'space',
      size: 2,
    };
    function log(o, title, cb: Function = (str: string) => str) {
      console.log(`/*****  ${title} *****/\n\n`, cb(format(o, config)), '\n\n\n');
    }

    const str = `
    - Audio Server/广播服务器
    - Exp Unit/扩展单元
    - PA Console/
    - Call Station/呼叫站
    - Speakers/
    - Power Supply/电源
    - Gateway/网关
  `;

    // const str = clipboard.readSync();
    const keys = str
      .replace(/-/g, '')
      .split(/\n/)
      .filter((str) => !!str.trim())
      .map((col) => {
        const [key, title = key] = col
          .trim()
          .split(/\//)
          .filter((str) => str.trim());
        console.log(key.replace(/\s+/g, '-'));
        return [
          key
            .replace(/\s+/g, '-')
            .replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
            .replace(/^(\w)/g, (all, letter) => letter.toLowerCase()),
          title, // cn title
          key.replace(/\s+/g, ' ').replace(/^(\w)/g, (all, letter) => letter.toUpperCase()), // en title
        ];
      });
    const recordEN = keys.reduce(
      (o, [key, cnTitle = key, title = cnTitle]) => ({ ...o, [key]: title }),
      {},
    );
    const recordCN = keys.reduce((o, [key, title = key]) => ({ ...o, [key]: title }), {});
    log(recordCN, 'record');

    const cols = keys.map(([key, title = key], index) => {
      const width = 14 * title.length + 2;
      return {
        // key,
        dataIndex: key,
        title: `${i18n_prefix}.${key}`,
        width,
      };
    });
    console.log(`import { useI18n } from 'vue-i18n';`, `const { t } = useI18n();`);
    log(cols, 'table', (str: string) => str.replace(/"title": (".+?")/g, `"title": t($1)`));

    const mock = cols.reduce((o, { dataIndex }) => ({ ...o, [dataIndex]: '@title()' }), {});
    log(mock, 'mock');

    const locale = i18n_prefix.split('.').reverse();
    log(
      locale.reduce((o, key) => ({ [key]: o }), recordCN),
      'recordCN',
    );
    log(
      locale.reduce((o, key) => ({ [key]: o }), recordEN),
      'recordEN',
    );

    // clipboard.writeSync(result);
  },
);
