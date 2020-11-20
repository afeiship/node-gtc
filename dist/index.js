/*!
 * name: @jswork/next-fetch-with-debug
 * description: Debug middleware for next fetch.
 * homepage: https://github.com/afeiship/next-fetch-with-debug
 * version: 1.0.0
 * date: 2020-11-20 17:50:25
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxLog = nx.log || require('@jswork/next-log');
  var DEFAULT_OPTIONS = { debug: false };

  nx.fetchWithDebug = function (inFetch) {
    return function (inUrl, inOptions) {
      var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
      options.debug && nxLog(inUrl, options);
      return inFetch(inUrl, options);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.fetchWithDebug;
  }
})();
