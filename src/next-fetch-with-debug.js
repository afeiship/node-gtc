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
