webpackHotUpdate(4,{

/***/ "./ethereum/web3.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web3__ = __webpack_require__("./node_modules/web3/src/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_web3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_web3__);
(function () {
  var enterModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").enterModule;

  enterModule && enterModule(module);
})();

// this is the library import
// however if we want to actually use web3 we need to declare an instance, see below


var web3 = void 0;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and metamask is running
  // get metamask instance that injects web3 into all web pages
  // this will not work if user does not metamask installed
  web3 = new __WEBPACK_IMPORTED_MODULE_0_web3___default.a(window.web3.currentProvider);
} else {
  // we are on the server or the user is not running metamask
  var provider = new __WEBPACK_IMPORTED_MODULE_0_web3___default.a.providers.HttpProvider("https://rinkeby.infura.io/I7ZBA1Dyv6i1WLOGfndw");
  web3 = new __WEBPACK_IMPORTED_MODULE_0_web3___default.a(provider);
}

var _default = web3;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__("./node_modules/react-hot-loader/patch.js").default;

  var leaveModule = __webpack_require__("./node_modules/react-hot-loader/patch.js").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(web3, "web3", "/Users/Rahul/GoogleDrive/Personal_Projects/PoliFund/BlockchainBackend/ethereum/web3.js");
  reactHotLoader.register(_default, "default", "/Users/Rahul/GoogleDrive/Personal_Projects/PoliFund/BlockchainBackend/ethereum/web3.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=4.94997397d435aa918489.hot-update.js.map