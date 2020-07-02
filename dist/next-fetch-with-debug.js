/*!
 * name: @feizheng/next-fetch-with-debug
 * description: Debug middleware for next fetch.
 * homepage: https://github.com/afeiship/next-fetch-with-debug
 * version: 1.0.1
 * date: 2020-07-02T08:34:28.641Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var nxLog = nx.log || require('@feizheng/next-log');

  nx.fetchWithDebug = function (inFetch) {
    return function (inUrl, inOptions) {
      inOptions.debug && nxLog(inUrl, inOptions);
      return inFetch(inUrl, inOptions);
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithDebug;
  }
})();

//# sourceMappingURL=next-fetch-with-debug.js.map
