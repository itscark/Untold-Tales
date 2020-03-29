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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/views/404.js":
/*!*****************************!*\
  !*** ./src/js/views/404.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.onload = function () {\n  var pageX = document.body.clientWidth;\n  var pageY = document.body.clientHeight;\n  var mouseY = 0;\n  var mouseX = 0;\n  document.addEventListener('mousemove', function (event) {\n    //verticalAxis\n    mouseY = event.pageY;\n    var yAxis = (pageY / 2 - mouseY) / pageY * 300; //horizontalAxis\n\n    mouseX = event.pageX / -pageX;\n    var xAxis = -mouseX * 100 - 100;\n    var ghostEyes = document.querySelectorAll('.box__ghost-eyes');\n    ghostEyes[0].style.transform = 'translate(' + xAxis + '%,-' + yAxis + '%)';\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlld3MvNDA0LmpzPzBjYjIiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwicGFnZVgiLCJkb2N1bWVudCIsImJvZHkiLCJjbGllbnRXaWR0aCIsInBhZ2VZIiwiY2xpZW50SGVpZ2h0IiwibW91c2VZIiwibW91c2VYIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwieUF4aXMiLCJ4QXhpcyIsImdob3N0RXllcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzdHlsZSIsInRyYW5zZm9ybSJdLCJtYXBwaW5ncyI6IkFBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixZQUFZO0FBQ3hCLE1BQUlDLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxJQUFULENBQWNDLFdBQTFCO0FBQ0EsTUFBSUMsS0FBSyxHQUFHSCxRQUFRLENBQUNDLElBQVQsQ0FBY0csWUFBMUI7QUFDQSxNQUFJQyxNQUFNLEdBQUMsQ0FBWDtBQUNBLE1BQUlDLE1BQU0sR0FBQyxDQUFYO0FBQ0FOLFVBQVEsQ0FBQ08sZ0JBQVQsQ0FBMEIsV0FBMUIsRUFBdUMsVUFBVUMsS0FBVixFQUFpQjtBQUNwRDtBQUNBSCxVQUFNLEdBQUdHLEtBQUssQ0FBQ0wsS0FBZjtBQUNBLFFBQUlNLEtBQUssR0FBRyxDQUFDTixLQUFLLEdBQUMsQ0FBTixHQUFRRSxNQUFULElBQWlCRixLQUFqQixHQUF1QixHQUFuQyxDQUhvRCxDQUlwRDs7QUFDQUcsVUFBTSxHQUFHRSxLQUFLLENBQUNULEtBQU4sR0FBYyxDQUFDQSxLQUF4QjtBQUNBLFFBQUlXLEtBQUssR0FBRyxDQUFDSixNQUFELEdBQVUsR0FBVixHQUFnQixHQUE1QjtBQUVBLFFBQUlLLFNBQVMsR0FBR1gsUUFBUSxDQUFDWSxnQkFBVCxDQUEwQixrQkFBMUIsQ0FBaEI7QUFFQUQsYUFBUyxDQUFDLENBQUQsQ0FBVCxDQUFhRSxLQUFiLENBQW1CQyxTQUFuQixHQUErQixlQUFjSixLQUFkLEdBQXFCLEtBQXJCLEdBQTRCRCxLQUE1QixHQUFtQyxJQUFsRTtBQUNILEdBWEQ7QUFZSCxDQWpCRCIsImZpbGUiOiIuL3NyYy9qcy92aWV3cy80MDQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBwYWdlWCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gICAgbGV0IHBhZ2VZID0gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gICAgbGV0IG1vdXNlWT0wO1xuICAgIGxldCBtb3VzZVg9MDtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgLy92ZXJ0aWNhbEF4aXNcbiAgICAgICAgbW91c2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgIGxldCB5QXhpcyA9IChwYWdlWS8yLW1vdXNlWSkvcGFnZVkqMzAwO1xuICAgICAgICAvL2hvcml6b250YWxBeGlzXG4gICAgICAgIG1vdXNlWCA9IGV2ZW50LnBhZ2VYIC8gLXBhZ2VYO1xuICAgICAgICBsZXQgeEF4aXMgPSAtbW91c2VYICogMTAwIC0gMTAwO1xuXG4gICAgICAgIGxldCBnaG9zdEV5ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94X19naG9zdC1leWVzJyk7XG5cbiAgICAgICAgZ2hvc3RFeWVzWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJysgeEF4aXMgKyclLC0nKyB5QXhpcyArJyUpJztcbiAgICB9KTtcbn07Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/views/404.js\n");

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** multi ./src/js/views/404.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/marcpeternell/code/asp/src/js/views/404.js */"./src/js/views/404.js");


/***/ })

/******/ });