import {
  ChildVuex
} from 'super-vuex';

import lang from '../../../lang.csv';

const fields = lang[0].slice(1);
const maps = [];
fields.forEach((field, index) => {
  if (field) {
    maps.push({
      key:field,
      index: index + 1
    })
  }
});
const data = lang.slice(1);
const language = {};

data.forEach(dat => {
  language[dat[0]] = {};
  maps.forEach(map => {
    language[dat[0]][map.key] = dat[map.index];
  });
});

const child = new ChildVuex('i18n');

child.setState({
  language,
  lang: null
});

export default child;