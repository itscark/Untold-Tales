/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/qrcode/qr.js":
/*!*****************************!*\
  !*** ./src/js/qrcode/qr.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.onload = function () {\n  var pathname = window.location.href.replace('qrcode', 'arjs');\n  var url = new URL(window.location.href);\n  var qrcode = new QRCode(document.getElementById(\"qrcode\"), {\n    width: 150,\n    height: 150\n  });\n  qrcode.makeCode(pathname);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcXJjb2RlL3FyLmpzPzYwNzMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwicGF0aG5hbWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlIiwidXJsIiwiVVJMIiwicXJjb2RlIiwiUVJDb2RlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIndpZHRoIiwiaGVpZ2h0IiwibWFrZUNvZGUiXSwibWFwcGluZ3MiOiJBQUFBQSxNQUFNLENBQUNDLE1BQVAsR0FBZ0IsWUFBWTtBQUN4QixNQUFJQyxRQUFRLEdBQUdGLE1BQU0sQ0FBQ0csUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJDLE9BQXJCLENBQTZCLFFBQTdCLEVBQXVDLE1BQXZDLENBQWY7QUFFQSxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsR0FBSixDQUFRUCxNQUFNLENBQUNHLFFBQVAsQ0FBZ0JDLElBQXhCLENBQVY7QUFFQSxNQUFNSSxNQUFNLEdBQUcsSUFBSUMsTUFBSixDQUFXQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBWCxFQUE4QztBQUN6REMsU0FBSyxFQUFFLEdBRGtEO0FBRXpEQyxVQUFNLEVBQUU7QUFGaUQsR0FBOUMsQ0FBZjtBQUlBTCxRQUFNLENBQUNNLFFBQVAsQ0FBZ0JaLFFBQWhCO0FBQ0gsQ0FWRCIsImZpbGUiOiIuL3NyYy9qcy9xcmNvZGUvcXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoJ3FyY29kZScsICdhcmpzJyk7XG5cbiAgICBsZXQgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICBjb25zdCBxcmNvZGUgPSBuZXcgUVJDb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXJjb2RlXCIpLCB7XG4gICAgICAgIHdpZHRoOiAxNTAsXG4gICAgICAgIGhlaWdodDogMTUwXG4gICAgfSk7XG4gICAgcXJjb2RlLm1ha2VDb2RlKHBhdGhuYW1lKTtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/qrcode/qr.js\n");

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** multi ./src/js/qrcode/qr.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/marcpeternell/code/asp/src/js/qrcode/qr.js */"./src/js/qrcode/qr.js");


/***/ })

/******/ });