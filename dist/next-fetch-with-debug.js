/*!
 * name: @feizheng/next-fetch-with-debug
 * description: Debug middleware for next fetch.
 * homepage: https://github.com/afeiship/next-fetch-with-debug
 * version: 1.0.2
 * date: 2020-07-18T13:18:43.239Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var nxLog = nx.log || require('@feizheng/next-log');
  var DEFAULT_OPTIONS = { debug: false };

  nx.fetchWithDebug = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      options.debug && nxLog(inUrl, options);
      return inFetch(inUrl, options);
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithDebug;
  }
})();

//# sourceMappingURL=next-fetch-with-debug.js.map
