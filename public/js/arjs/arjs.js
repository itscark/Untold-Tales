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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/arjs/arjs.js":
/*!*****************************!*\
  !*** ./src/js/arjs/arjs.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.onload = function () {\n  var defaultChar = \"Stromboli\";\n  var body = document.getElementById('body');\n  var url = new URL(window.location.href);\n  var getChar = url.searchParams.get('char');\n  var stories_json;\n\n  function loadJSON(callback) {\n    var xobj = new XMLHttpRequest();\n    xobj.overrideMimeType(\"application/json\");\n    xobj.open('GET', '../assets/stories/stories.json', false);\n\n    xobj.onreadystatechange = function () {\n      if (xobj.readyState == 4 && xobj.status == \"200\") {\n        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode\n        callback(xobj.responseText);\n      }\n    };\n\n    xobj.send(null);\n  }\n\n  loadJSON(function (response) {\n    // Parse JSON string into object\n    stories_json = JSON.parse(response);\n    filterCharResponse(stories_json);\n  });\n\n  function filterCharResponse(json) {\n    var obj = json['charakter'];\n    var setChar = defaultChar;\n\n    for (var i = 0; i < obj.length; i++) {\n      //check if there is a char in the URl, if not set it to default Char\n      if (obj[i].name == getChar) {\n        setChar = getChar;\n      }\n    } //Append HTML to body with the right Asset\n\n\n    insertHTML(setChar);\n  }\n\n  function insertHTML(_char) {\n    body.insertAdjacentHTML('afterbegin', '<a-scene embedded\\n' + '         arjs=\"debugUIEnabled: false; sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960\"\\n' + '         vr-mode-ui=\"enabled: false\" device-orientation-permission-ui=\"enabled: false\"\\n' + '         artoolkit=\"sourceType: webcam;\"\\n' + '         outline\\n' + '         antialias=\"true\">\\n' + '    <a-assets>\\n' + '        <a-asset-item\\n' + '                id=\"asset\"\\n' + '                src=\"../assets/chars/' + _char + '/' + _char + '.gltf\"\\n' + '        ></a-asset-item>\\n' + '    </a-assets>\\n' + '    <a-marker type=\"pattern\" url=\"../assets/images/arjs/pattern/sae.patt\">\\n' + '        <a-entity light=\"type: point;\\n' + '        color: #fff;\\n' + '        distance: 50;\\n' + '        intensity: 2.5;\"\\n' + '                  position=\"0 5 0 \"></a-entity>\\n' + '        <a-entity\\n' + '                id=\"directionaltarget\"\\n' + '                rotation=\"-90 90 -90\"\\n' + '                scale=\"1 1 1\"\\n' + '                animation-mixer=\"clip: Idle\"\\n' + '                position=\"0 0 1\"\\n' + '                gltf-model=\"#asset\"\\n' + '        ></a-entity>\\n' + '\\n' + '    </a-marker>\\n' + '    <a-entity camera></a-entity>\\n' + '</a-scene>\\n');\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJqcy9hcmpzLmpzPzdjNTgiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiZGVmYXVsdENoYXIiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInVybCIsIlVSTCIsImxvY2F0aW9uIiwiaHJlZiIsImdldENoYXIiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJzdG9yaWVzX2pzb24iLCJsb2FkSlNPTiIsImNhbGxiYWNrIiwieG9iaiIsIlhNTEh0dHBSZXF1ZXN0Iiwib3ZlcnJpZGVNaW1lVHlwZSIsIm9wZW4iLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic2VuZCIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwiZmlsdGVyQ2hhclJlc3BvbnNlIiwianNvbiIsIm9iaiIsInNldENoYXIiLCJpIiwibGVuZ3RoIiwibmFtZSIsImluc2VydEhUTUwiLCJjaGFyIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIl0sIm1hcHBpbmdzIjoiQUFBQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLFlBQVk7QUFFeEIsTUFBTUMsV0FBVyxHQUFHLFdBQXBCO0FBRUEsTUFBTUMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBYjtBQUVBLE1BQUlDLEdBQUcsR0FBRyxJQUFJQyxHQUFKLENBQVFQLE1BQU0sQ0FBQ1EsUUFBUCxDQUFnQkMsSUFBeEIsQ0FBVjtBQUNBLE1BQUlDLE9BQU8sR0FBR0osR0FBRyxDQUFDSyxZQUFKLENBQWlCQyxHQUFqQixDQUFxQixNQUFyQixDQUFkO0FBRUEsTUFBSUMsWUFBSjs7QUFFQSxXQUFTQyxRQUFULENBQWtCQyxRQUFsQixFQUE0QjtBQUN4QixRQUFJQyxJQUFJLEdBQUcsSUFBSUMsY0FBSixFQUFYO0FBQ0FELFFBQUksQ0FBQ0UsZ0JBQUwsQ0FBc0Isa0JBQXRCO0FBQ0FGLFFBQUksQ0FBQ0csSUFBTCxDQUFVLEtBQVYsRUFBaUIsZ0NBQWpCLEVBQW1ELEtBQW5EOztBQUNBSCxRQUFJLENBQUNJLGtCQUFMLEdBQTBCLFlBQVk7QUFDbEMsVUFBSUosSUFBSSxDQUFDSyxVQUFMLElBQW1CLENBQW5CLElBQXdCTCxJQUFJLENBQUNNLE1BQUwsSUFBZSxLQUEzQyxFQUFrRDtBQUM5QztBQUNBUCxnQkFBUSxDQUFDQyxJQUFJLENBQUNPLFlBQU4sQ0FBUjtBQUNIO0FBQ0osS0FMRDs7QUFNQVAsUUFBSSxDQUFDUSxJQUFMLENBQVUsSUFBVjtBQUNIOztBQUVEVixVQUFRLENBQUMsVUFBQ1csUUFBRCxFQUFjO0FBQ25CO0FBQ0FaLGdCQUFZLEdBQUdhLElBQUksQ0FBQ0MsS0FBTCxDQUFXRixRQUFYLENBQWY7QUFDQUcsc0JBQWtCLENBQUNmLFlBQUQsQ0FBbEI7QUFDSCxHQUpPLENBQVI7O0FBTUEsV0FBU2Usa0JBQVQsQ0FBNEJDLElBQTVCLEVBQWtDO0FBQzlCLFFBQUlDLEdBQUcsR0FBR0QsSUFBSSxDQUFDLFdBQUQsQ0FBZDtBQUNBLFFBQUlFLE9BQU8sR0FBRzdCLFdBQWQ7O0FBQ0EsU0FBSyxJQUFJOEIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsR0FBRyxDQUFDRyxNQUF4QixFQUFnQ0QsQ0FBQyxFQUFqQyxFQUFxQztBQUNqQztBQUNBLFVBQUlGLEdBQUcsQ0FBQ0UsQ0FBRCxDQUFILENBQU9FLElBQVAsSUFBZXhCLE9BQW5CLEVBQTRCO0FBQ3hCcUIsZUFBTyxHQUFHckIsT0FBVjtBQUNIO0FBQ0osS0FSNkIsQ0FTOUI7OztBQUNBeUIsY0FBVSxDQUFDSixPQUFELENBQVY7QUFDSDs7QUFFRCxXQUFTSSxVQUFULENBQW9CQyxLQUFwQixFQUEwQjtBQUN0QmpDLFFBQUksQ0FBQ2tDLGtCQUFMLENBQXdCLFlBQXhCLEVBQXNDLHdCQUNsQyx5SUFEa0MsR0FFbEMsMEZBRmtDLEdBR2xDLDRDQUhrQyxHQUlsQyxvQkFKa0MsR0FLbEMsOEJBTGtDLEdBTWxDLGtCQU5rQyxHQU9sQyx5QkFQa0MsR0FRbEMsOEJBUmtDLEdBU2xDLHVDQVRrQyxHQVNRRCxLQVRSLEdBU2UsR0FUZixHQVNxQkEsS0FUckIsR0FTNEIsVUFUNUIsR0FVbEMsNEJBVmtDLEdBV2xDLG1CQVhrQyxHQVlsQyw4RUFaa0MsR0FhbEMseUNBYmtDLEdBY2xDLHdCQWRrQyxHQWVsQyx5QkFma0MsR0FnQmxDLDRCQWhCa0MsR0FpQmxDLG1EQWpCa0MsR0FrQmxDLHFCQWxCa0MsR0FtQmxDLDBDQW5Ca0MsR0FvQmxDLHlDQXBCa0MsR0FxQmxDLGlDQXJCa0MsR0FzQmxDLGdEQXRCa0MsR0F1QmxDLG9DQXZCa0MsR0F3QmxDLHVDQXhCa0MsR0F5QmxDLHdCQXpCa0MsR0EwQmxDLElBMUJrQyxHQTJCbEMsbUJBM0JrQyxHQTRCbEMsb0NBNUJrQyxHQTZCbEMsY0E3Qko7QUE4Qkg7QUFDSixDQTNFRCIsImZpbGUiOiIuL3NyYy9qcy9hcmpzL2FyanMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgZGVmYXVsdENoYXIgPSBcIlN0cm9tYm9saVwiO1xuXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jyk7XG5cbiAgICBsZXQgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgbGV0IGdldENoYXIgPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnY2hhcicpO1xuXG4gICAgbGV0IHN0b3JpZXNfanNvbjtcblxuICAgIGZ1bmN0aW9uIGxvYWRKU09OKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCB4b2JqID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhvYmoub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICAgIHhvYmoub3BlbignR0VUJywgJy4uL2Fzc2V0cy9zdG9yaWVzL3N0b3JpZXMuanNvbicsIGZhbHNlKTtcbiAgICAgICAgeG9iai5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoeG9iai5yZWFkeVN0YXRlID09IDQgJiYgeG9iai5zdGF0dXMgPT0gXCIyMDBcIikge1xuICAgICAgICAgICAgICAgIC8vIFJlcXVpcmVkIHVzZSBvZiBhbiBhbm9ueW1vdXMgY2FsbGJhY2sgYXMgLm9wZW4gd2lsbCBOT1QgcmV0dXJuIGEgdmFsdWUgYnV0IHNpbXBseSByZXR1cm5zIHVuZGVmaW5lZCBpbiBhc3luY2hyb25vdXMgbW9kZVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhvYmoucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeG9iai5zZW5kKG51bGwpO1xuICAgIH1cblxuICAgIGxvYWRKU09OKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBQYXJzZSBKU09OIHN0cmluZyBpbnRvIG9iamVjdFxuICAgICAgICBzdG9yaWVzX2pzb24gPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgZmlsdGVyQ2hhclJlc3BvbnNlKHN0b3JpZXNfanNvbik7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJDaGFyUmVzcG9uc2UoanNvbikge1xuICAgICAgICBsZXQgb2JqID0ganNvblsnY2hhcmFrdGVyJ107XG4gICAgICAgIGxldCBzZXRDaGFyID0gZGVmYXVsdENoYXI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvL2NoZWNrIGlmIHRoZXJlIGlzIGEgY2hhciBpbiB0aGUgVVJsLCBpZiBub3Qgc2V0IGl0IHRvIGRlZmF1bHQgQ2hhclxuICAgICAgICAgICAgaWYgKG9ialtpXS5uYW1lID09IGdldENoYXIpIHtcbiAgICAgICAgICAgICAgICBzZXRDaGFyID0gZ2V0Q2hhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL0FwcGVuZCBIVE1MIHRvIGJvZHkgd2l0aCB0aGUgcmlnaHQgQXNzZXRcbiAgICAgICAgaW5zZXJ0SFRNTChzZXRDaGFyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRIVE1MKGNoYXIpIHtcbiAgICAgICAgYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGEtc2NlbmUgZW1iZWRkZWRcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBhcmpzPVwiZGVidWdVSUVuYWJsZWQ6IGZhbHNlOyBzb3VyY2VUeXBlOiB3ZWJjYW07IHNvdXJjZVdpZHRoOjEyODA7IHNvdXJjZUhlaWdodDo5NjA7IGRpc3BsYXlXaWR0aDogMTI4MDsgZGlzcGxheUhlaWdodDogOTYwXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICB2ci1tb2RlLXVpPVwiZW5hYmxlZDogZmFsc2VcIiBkZXZpY2Utb3JpZW50YXRpb24tcGVybWlzc2lvbi11aT1cImVuYWJsZWQ6IGZhbHNlXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBhcnRvb2xraXQ9XCJzb3VyY2VUeXBlOiB3ZWJjYW07XCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBvdXRsaW5lXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgYW50aWFsaWFzPVwidHJ1ZVwiPlxcbicgK1xuICAgICAgICAgICAgJyAgICA8YS1hc3NldHM+XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICA8YS1hc3NldC1pdGVtXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIGlkPVwiYXNzZXRcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBzcmM9XCIuLi9hc3NldHMvY2hhcnMvJyArIGNoYXIgKyAnLycgKyBjaGFyICsgJy5nbHRmXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgID48L2EtYXNzZXQtaXRlbT5cXG4nICtcbiAgICAgICAgICAgICcgICAgPC9hLWFzc2V0cz5cXG4nICtcbiAgICAgICAgICAgICcgICAgPGEtbWFya2VyIHR5cGU9XCJwYXR0ZXJuXCIgdXJsPVwiLi4vYXNzZXRzL2ltYWdlcy9hcmpzL3BhdHRlcm4vc2FlLnBhdHRcIj5cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIDxhLWVudGl0eSBsaWdodD1cInR5cGU6IHBvaW50O1xcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgY29sb3I6ICNmZmY7XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICBkaXN0YW5jZTogNTA7XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICBpbnRlbnNpdHk6IDIuNTtcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPVwiMCA1IDAgXCI+PC9hLWVudGl0eT5cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIDxhLWVudGl0eVxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBpZD1cImRpcmVjdGlvbmFsdGFyZ2V0XCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgcm90YXRpb249XCItOTAgOTAgLTkwXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgc2NhbGU9XCIxIDEgMVwiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIGFuaW1hdGlvbi1taXhlcj1cImNsaXA6IElkbGVcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBwb3NpdGlvbj1cIjAgMCAxXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgZ2x0Zi1tb2RlbD1cIiNhc3NldFwiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICA+PC9hLWVudGl0eT5cXG4nICtcbiAgICAgICAgICAgICdcXG4nICtcbiAgICAgICAgICAgICcgICAgPC9hLW1hcmtlcj5cXG4nICtcbiAgICAgICAgICAgICcgICAgPGEtZW50aXR5IGNhbWVyYT48L2EtZW50aXR5PlxcbicgK1xuICAgICAgICAgICAgJzwvYS1zY2VuZT5cXG4nKVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/arjs/arjs.js\n");

/***/ }),

/***/ 1:
/*!***********************************!*\
  !*** multi ./src/js/arjs/arjs.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/marcpeternell/code/asp/src/js/arjs/arjs.js */"./src/js/arjs/arjs.js");


/***/ })

/******/ });