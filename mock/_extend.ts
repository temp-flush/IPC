/* eslint-disable @typescript-eslint/no-var-requires */
import { Random, mock } from 'mockjs';

const Constants = {} as any;

// common
Random.extend({
  status(max = 1) {
    return this.integer(0, max);
  },
  rate: function () {
    let float = this.float(0, 1);
    if (float > 1) float -= 1;
    return float;
  },
  regexp(reg, desc) {
    reg = reg instanceof RegExp ? reg : new RegExp(reg, desc);
    const { exp } = mock({
      exp: reg,
    });
    return exp;
  },
  size() {
    return this.integer(0, 1000000);
  },
  mobile: function () {
    return this.regexp(/1[0-9]{10}/);
  },
  video: function () {
    const list = [
      'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f690000bi3fihklbum9f3e78u80&amp;line=0',
      'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f880000bihovjj82vu9qr5p200g&line=0',
      'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0200f060000biganhkmavf3gqf4q7h0&line=0',
      'https://aweme.snssdk.com/aweme/v1/playwm/?video_id=v0300f910000bik9uret2ulhrf4f99mg&line=0',
    ];

    return this.pick(list);
  },
  avatar: function () {
    return `https://randomuser.me/api/portraits/women/${this.integer(1, 100)}.jpg`;
  },
  address: function () {
    return {
      areaId: '@zip',
      areaName: '@county',
      cityId: '@zip',
      cityName: '@city',
      provinceId: '@zip',
      provinceName: '@province',
    };
  },
  constantId(list) {
    const values = Object.values(list);
    // values = values.slice(values.length / 2);

    return this.pick(values);
  },
  constantName(list, id) {
    return this.constantProp(list, 'name', id);
  },
  constantProp(list, prop, id) {
    if (id !== undefined) {
      const item = list.find((item) => item.id === id);

      return item?.[prop];
    }
    const values = list.map((item) => item[prop]);
    return this.pick(values);
  },
  list(record, [min = 10, max = min], ...params) {
    const { list } = mock({
      [`list|${min}-${max}`]: [
        '@' +
          record +
          (params?.length ? `(${params.map((item) => JSON.stringify(item)).join(',')})` : ''),
      ],
    });
    return mock(list);
  },
  thumbnail() {
    return this.image(undefined, this.color());
  },
});
