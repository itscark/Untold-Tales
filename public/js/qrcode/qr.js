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

eval("window.onload = function () {\n  //search the url and replace items with correct part to generate the right QR Code\n  var pathname = window.location.href.replace('qrcode', 'arjs'); //generate a new url with the correct parameters\n\n  var url = new URL(window.location.href); //QRCode is a js lib to dynamicaly generate qr codes first set needed parameters\n\n  var qrcode = new QRCode(document.getElementById(\"qrcode\"), {\n    //there are different Correction levels for the qrcode to restore data if it is damaged or dirty.\n    // L is up to 7% error correction -> because the qr code will only displayed digital the chances of a qr code to get damaged or dirty is very small.\n    correctLevel: QRCode.CorrectLevel.L\n  }); //generate the QR Code and append it to the Dom element.\n\n  qrcode.makeCode(pathname);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcXJjb2RlL3FyLmpzPzYwNzMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwicGF0aG5hbWUiLCJsb2NhdGlvbiIsImhyZWYiLCJyZXBsYWNlIiwidXJsIiwiVVJMIiwicXJjb2RlIiwiUVJDb2RlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNvcnJlY3RMZXZlbCIsIkNvcnJlY3RMZXZlbCIsIkwiLCJtYWtlQ29kZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixZQUFZO0FBQ3hCO0FBQ0EsTUFBSUMsUUFBUSxHQUFHRixNQUFNLENBQUNHLFFBQVAsQ0FBZ0JDLElBQWhCLENBQXFCQyxPQUFyQixDQUE2QixRQUE3QixFQUF1QyxNQUF2QyxDQUFmLENBRndCLENBR3hCOztBQUNBLE1BQUlDLEdBQUcsR0FBRyxJQUFJQyxHQUFKLENBQVFQLE1BQU0sQ0FBQ0csUUFBUCxDQUFnQkMsSUFBeEIsQ0FBVixDQUp3QixDQUt4Qjs7QUFDQSxNQUFNSSxNQUFNLEdBQUcsSUFBSUMsTUFBSixDQUFXQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBWCxFQUE4QztBQUN6RDtBQUNBO0FBQ0FDLGdCQUFZLEVBQUdILE1BQU0sQ0FBQ0ksWUFBUCxDQUFvQkM7QUFIc0IsR0FBOUMsQ0FBZixDQU53QixDQVd4Qjs7QUFDQU4sUUFBTSxDQUFDTyxRQUFQLENBQWdCYixRQUFoQjtBQUNILENBYkQiLCJmaWxlIjoiLi9zcmMvanMvcXJjb2RlL3FyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvL3NlYXJjaCB0aGUgdXJsIGFuZCByZXBsYWNlIGl0ZW1zIHdpdGggY29ycmVjdCBwYXJ0IHRvIGdlbmVyYXRlIHRoZSByaWdodCBRUiBDb2RlXG4gICAgbGV0IHBhdGhuYW1lID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgncXJjb2RlJywgJ2FyanMnKTtcbiAgICAvL2dlbmVyYXRlIGEgbmV3IHVybCB3aXRoIHRoZSBjb3JyZWN0IHBhcmFtZXRlcnNcbiAgICBsZXQgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgLy9RUkNvZGUgaXMgYSBqcyBsaWIgdG8gZHluYW1pY2FseSBnZW5lcmF0ZSBxciBjb2RlcyBmaXJzdCBzZXQgbmVlZGVkIHBhcmFtZXRlcnNcbiAgICBjb25zdCBxcmNvZGUgPSBuZXcgUVJDb2RlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXJjb2RlXCIpLCB7XG4gICAgICAgIC8vdGhlcmUgYXJlIGRpZmZlcmVudCBDb3JyZWN0aW9uIGxldmVscyBmb3IgdGhlIHFyY29kZSB0byByZXN0b3JlIGRhdGEgaWYgaXQgaXMgZGFtYWdlZCBvciBkaXJ0eS5cbiAgICAgICAgLy8gTCBpcyB1cCB0byA3JSBlcnJvciBjb3JyZWN0aW9uIC0+IGJlY2F1c2UgdGhlIHFyIGNvZGUgd2lsbCBvbmx5IGRpc3BsYXllZCBkaWdpdGFsIHRoZSBjaGFuY2VzIG9mIGEgcXIgY29kZSB0byBnZXQgZGFtYWdlZCBvciBkaXJ0eSBpcyB2ZXJ5IHNtYWxsLlxuICAgICAgICBjb3JyZWN0TGV2ZWwgOiBRUkNvZGUuQ29ycmVjdExldmVsLkxcbiAgICB9KTtcbiAgICAvL2dlbmVyYXRlIHRoZSBRUiBDb2RlIGFuZCBhcHBlbmQgaXQgdG8gdGhlIERvbSBlbGVtZW50LlxuICAgIHFyY29kZS5tYWtlQ29kZShwYXRobmFtZSk7XG59OyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/qrcode/qr.js\n");

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