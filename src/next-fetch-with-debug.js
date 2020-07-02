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
