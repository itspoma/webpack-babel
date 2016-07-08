/* eslint-disable no-alert */

require('./logger.scss');

export default function (message) {
  const tpl = ['INFO', message].join('');
  alert(tpl);
}
