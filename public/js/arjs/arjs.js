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

eval("window.onload = function () {\n  var defaultChar = \"Chupacabra\";\n  var body = document.getElementById('body');\n  var url = new URL(window.location.href);\n  var getChar = url.searchParams.get('char');\n  var stories_json;\n\n  function loadJSON(callback) {\n    var xobj = new XMLHttpRequest();\n    xobj.overrideMimeType(\"application/json\");\n    xobj.open('GET', '../assets/stories/stories.json', false);\n\n    xobj.onreadystatechange = function () {\n      if (xobj.readyState == 4 && xobj.status == \"200\") {\n        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode\n        callback(xobj.responseText);\n      }\n    };\n\n    xobj.send(null);\n  }\n\n  loadJSON(function (response) {\n    // Parse JSON string into object\n    stories_json = JSON.parse(response);\n    filterCharResponse(stories_json);\n  });\n\n  function filterCharResponse(json) {\n    var obj = json['charakter'];\n    var setChar = defaultChar;\n\n    for (var i = 0; i < obj.length; i++) {\n      //check if there is a char in the URl, if not set it to default Char\n      if (obj[i].name == getChar) {\n        setChar = getChar;\n      }\n    } //Append HTML to body with the right Asset\n\n\n    insertHTML(setChar);\n  } //select parent elements\n\n\n  var buttonWrapper = document.getElementById('button_wrapper');\n  var directionaltarget = document.getElementById('directionaltarget'); //this function is needed to danymicaly load the chars\n\n  function insertHTML(_char) {\n    //load the gltf FIle\n    //jquery is used because its easy async load of the gltf file\n    $.getJSON('../assets/chars/' + _char + '/' + _char + '.gltf', function (json) {\n      //loop all animations\n      json.animations.forEach(function (element) {\n        //create button elements\n        var li = document.createElement('button');\n        li.setAttribute('class', 'animationBtn'); //append them to the dom element\n\n        li.appendChild(document.createTextNode(element.name)); //add devent listener to change the animation of the asset\n\n        li.addEventListener(\"click\", function () {\n          //animation-mixer defines the animation that is played\n          directionaltarget.setAttribute('animation-mixer', 'clip: ' + element.name);\n        }); //append all buttons to DOM\n\n        buttonWrapper.appendChild(li);\n      });\n    });\n    body.insertAdjacentHTML('beforeend', '<a-scene embedded\\n' + '         arjs=\"debugUIEnabled: false; sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960\"\\n' + '         vr-mode-ui=\"enabled: false\" device-orientation-permission-ui=\"enabled: false\"\\n' + '         artoolkit=\"sourceType: webcam;\"\\n' + '         outline\\n' + '         antialias=\"true\">\\n' + '    <a-assets>\\n' + '        <a-asset-item\\n' + '                id=\"asset\"\\n' + '                src=\"../assets/chars/' + _char + '/' + _char + '.gltf\"\\n' + '        ></a-asset-item>\\n' + '    </a-assets>\\n' + '    <a-marker type=\"pattern\" url=\"../assets/images/arjs/pattern/sae.patt\">\\n' + '        <a-entity light=\"type: point;\\n' + '        color: #fff;\\n' + '        distance: 50;\\n' + '        intensity: 2.5;\"\\n' + '                  position=\"0 5 0 \"></a-entity>\\n' + '        <a-entity\\n' + '                id=\"directionaltarget\"\\n' + '                rotation=\"-90 90 -90\"\\n' + '                scale=\"20 20 20\"\\n' + '                animation-mixer=\"clip: Neutral\"\\n' + '                position=\"0 0 1\"\\n' + '                gltf-model=\"#asset\"\\n' + '        ></a-entity>\\n' + '\\n' + '    </a-marker>\\n' + '    <a-entity camera></a-entity>\\n' + '</a-scene>\\n');\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJqcy9hcmpzLmpzPzdjNTgiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiZGVmYXVsdENoYXIiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInVybCIsIlVSTCIsImxvY2F0aW9uIiwiaHJlZiIsImdldENoYXIiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJzdG9yaWVzX2pzb24iLCJsb2FkSlNPTiIsImNhbGxiYWNrIiwieG9iaiIsIlhNTEh0dHBSZXF1ZXN0Iiwib3ZlcnJpZGVNaW1lVHlwZSIsIm9wZW4iLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic2VuZCIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwiZmlsdGVyQ2hhclJlc3BvbnNlIiwianNvbiIsIm9iaiIsInNldENoYXIiLCJpIiwibGVuZ3RoIiwibmFtZSIsImluc2VydEhUTUwiLCJidXR0b25XcmFwcGVyIiwiZGlyZWN0aW9uYWx0YXJnZXQiLCJjaGFyIiwiJCIsImdldEpTT04iLCJhbmltYXRpb25zIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluc2VydEFkamFjZW50SFRNTCJdLCJtYXBwaW5ncyI6IkFBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixZQUFZO0FBRXhCLE1BQU1DLFdBQVcsR0FBRyxZQUFwQjtBQUVBLE1BQU1DLElBQUksR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFFQSxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsR0FBSixDQUFRUCxNQUFNLENBQUNRLFFBQVAsQ0FBZ0JDLElBQXhCLENBQVY7QUFDQSxNQUFJQyxPQUFPLEdBQUdKLEdBQUcsQ0FBQ0ssWUFBSixDQUFpQkMs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LHlCQVBpQyxHQVFqQyw4QkFSaUMsR0FTakMsdUNBVGlDLEdBU1NaLEtBVFQsR0FTZ0IsR0FUaEIsR0FTc0JBLEtBVHRCLEdBUzZCLFVBVDdCLEdBVWpDLDRCQVZpQyxHQVdqQyxtQkFYaUMsR0FZakMsOEVBWmlDLEdBYWpDLHlDQWJpQyxHQWNqQyx3QkFkaUMsR0FlakMseUJBZmlDLEdBZ0JqQyw0QkFoQmlDLEdBaUJqQyxtREFqQmlDLEdBa0JqQyxxQkFsQmlDLEdBbUJqQywwQ0FuQmlDLEdBb0JqQyx5Q0FwQmlDLEdBcUJqQyxvQ0FyQmlDLEdBc0JqQyxtREF0QmlDLEdBdUJqQyxvQ0F2QmlDLEdBd0JqQyx1Q0F4QmlDLEdBeUJqQyx3QkF6QmlDLEdBMEJqQyxJQTFCaUMsR0EyQmpDLG1CQTNCaUMsR0E0QmpDLG9DQTVCaUMsR0E2QmpDLGNBN0JKO0FBOEJIO0FBQ0osQ0F2R0QiLCJmaWxlIjoiLi9zcmMvanMvYXJqcy9hcmpzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IGRlZmF1bHRDaGFyID0gXCJDaHVwYWNhYnJhXCI7XG5cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHknKTtcblxuICAgIGxldCB1cmwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBsZXQgZ2V0Q2hhciA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdjaGFyJyk7XG5cbiAgICBsZXQgc3Rvcmllc19qc29uO1xuXG4gICAgZnVuY3Rpb24gbG9hZEpTT04oY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHhvYmogPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeG9iai5vdmVycmlkZU1pbWVUeXBlKFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgeG9iai5vcGVuKCdHRVQnLCAnLi4vYXNzZXRzL3N0b3JpZXMvc3Rvcmllcy5qc29uJywgZmFsc2UpO1xuICAgICAgICB4b2JqLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh4b2JqLnJlYWR5U3RhdGUgPT0gNCAmJiB4b2JqLnN0YXR1cyA9PSBcIjIwMFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVxdWlyZWQgdXNlIG9mIGFuIGFub255bW91cyBjYWxsYmFjayBhcyAub3BlbiB3aWxsIE5PVCByZXR1cm4gYSB2YWx1ZSBidXQgc2ltcGx5IHJldHVybnMgdW5kZWZpbmVkIGluIGFzeW5jaHJvbm91cyBtb2RlXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soeG9iai5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB4b2JqLnNlbmQobnVsbCk7XG4gICAgfVxuXG4gICAgbG9hZEpTT04oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vIFBhcnNlIEpTT04gc3RyaW5nIGludG8gb2JqZWN0XG4gICAgICAgIHN0b3JpZXNfanNvbiA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICBmaWx0ZXJDaGFyUmVzcG9uc2Uoc3Rvcmllc19qc29uKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGZpbHRlckNoYXJSZXNwb25zZShqc29uKSB7XG4gICAgICAgIGxldCBvYmogPSBqc29uWydjaGFyYWt0ZXInXTtcbiAgICAgICAgbGV0IHNldENoYXIgPSBkZWZhdWx0Q2hhcjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vY2hlY2sgaWYgdGhlcmUgaXMgYSBjaGFyIGluIHRoZSBVUmwsIGlmIG5vdCBzZXQgaXQgdG8gZGVmYXVsdCBDaGFyXG4gICAgICAgICAgICBpZiAob2JqW2ldLm5hbWUgPT0gZ2V0Q2hhcikge1xuICAgICAgICAgICAgICAgIHNldENoYXIgPSBnZXRDaGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vQXBwZW5kIEhUTUwgdG8gYm9keSB3aXRoIHRoZSByaWdodCBBc3NldFxuICAgICAgICBpbnNlcnRIVE1MKHNldENoYXIpO1xuICAgIH1cblxuICAgIC8vc2VsZWN0IHBhcmVudCBlbGVtZW50c1xuICAgIGNvbnN0IGJ1dHRvbldyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9uX3dyYXBwZXInKTtcbiAgICBjb25zdCBkaXJlY3Rpb25hbHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25hbHRhcmdldCcpO1xuXG4gICAgLy90aGlzIGZ1bmN0aW9uIGlzIG5lZWRlZCB0byBkYW55bWljYWx5IGxvYWQgdGhlIGNoYXJzXG4gICAgZnVuY3Rpb24gaW5zZXJ0SFRNTChjaGFyKSB7XG5cbiAgICAgICAgLy9sb2FkIHRoZSBnbHRmIEZJbGVcbiAgICAgICAgLy9qcXVlcnkgaXMgdXNlZCBiZWNhdXNlIGl0cyBlYXN5IGFzeW5jIGxvYWQgb2YgdGhlIGdsdGYgZmlsZVxuICAgICAgICAkLmdldEpTT04oJy4uL2Fzc2V0cy9jaGFycy8nKyBjaGFyICsnLycrIGNoYXIgKyAnLmdsdGYnLCBmdW5jdGlvbihqc29uKSB7XG4gICAgICAgICAgICAvL2xvb3AgYWxsIGFuaW1hdGlvbnNcbiAgICAgICAgICAgIGpzb24uYW5pbWF0aW9ucy5mb3JFYWNoKCAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vY3JlYXRlIGJ1dHRvbiBlbGVtZW50c1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYW5pbWF0aW9uQnRuJyk7XG4gICAgICAgICAgICAgICAgLy9hcHBlbmQgdGhlbSB0byB0aGUgZG9tIGVsZW1lbnRcbiAgICAgICAgICAgICAgICBsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlbGVtZW50Lm5hbWUpKTtcbiAgICAgICAgICAgICAgICAvL2FkZCBkZXZlbnQgbGlzdGVuZXIgdG8gY2hhbmdlIHRoZSBhbmltYXRpb24gb2YgdGhlIGFzc2V0XG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9hbmltYXRpb24tbWl4ZXIgZGVmaW5lcyB0aGUgYW5pbWF0aW9uIHRoYXQgaXMgcGxheWVkXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbmFsdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYW5pbWF0aW9uLW1peGVyJywgJ2NsaXA6ICcgKyBlbGVtZW50Lm5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vYXBwZW5kIGFsbCBidXR0b25zIHRvIERPTVxuICAgICAgICAgICAgICAgIGJ1dHRvbldyYXBwZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KTtcblxuXG4gICAgICAgIGJvZHkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCAnPGEtc2NlbmUgZW1iZWRkZWRcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBhcmpzPVwiZGVidWdVSUVuYWJsZWQ6IGZhbHNlOyBzb3VyY2VUeXBlOiB3ZWJjYW07IHNvdXJjZVdpZHRoOjEyODA7IHNvdXJjZUhlaWdodDo5NjA7IGRpc3BsYXlXaWR0aDogMTI4MDsgZGlzcGxheUhlaWdodDogOTYwXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICB2ci1tb2RlLXVpPVwiZW5hYmxlZDogZmFsc2VcIiBkZXZpY2Utb3JpZW50YXRpb24tcGVybWlzc2lvbi11aT1cImVuYWJsZWQ6IGZhbHNlXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBhcnRvb2xraXQ9XCJzb3VyY2VUeXBlOiB3ZWJjYW07XCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBvdXRsaW5lXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgYW50aWFsaWFzPVwidHJ1ZVwiPlxcbicgK1xuICAgICAgICAgICAgJyAgICA8YS1hc3NldHM+XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICA8YS1hc3NldC1pdGVtXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIGlkPVwiYXNzZXRcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBzcmM9XCIuLi9hc3NldHMvY2hhcnMvJyArIGNoYXIgKyAnLycgKyBjaGFyICsgJy5nbHRmXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgID48L2EtYXNzZXQtaXRlbT5cXG4nICtcbiAgICAgICAgICAgICcgICAgPC9hLWFzc2V0cz5cXG4nICtcbiAgICAgICAgICAgICcgICAgPGEtbWFya2VyIHR5cGU9XCJwYXR0ZXJuXCIgdXJsPVwiLi4vYXNzZXRzL2ltYWdlcy9hcmpzL3BhdHRlcm4vc2FlLnBhdHRcIj5cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIDxhLWVudGl0eSBsaWdodD1cInR5cGU6IHBvaW50O1xcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgY29sb3I6ICNmZmY7XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICBkaXN0YW5jZTogNTA7XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICBpbnRlbnNpdHk6IDIuNTtcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPVwiMCA1IDAgXCI+PC9hLWVudGl0eT5cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIDxhLWVudGl0eVxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBpZD1cImRpcmVjdGlvbmFsdGFyZ2V0XCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgcm90YXRpb249XCItOTAgOTAgLTkwXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgc2NhbGU9XCIyMCAyMCAyMFwiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIGFuaW1hdGlvbi1taXhlcj1cImNsaXA6IE5ldXRyYWxcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBwb3NpdGlvbj1cIjAgMCAxXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgZ2x0Zi1tb2RlbD1cIiNhc3NldFwiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICA+PC9hLWVudGl0eT5cXG4nICtcbiAgICAgICAgICAgICdcXG4nICtcbiAgICAgICAgICAgICcgICAgPC9hLW1hcmtlcj5cXG4nICtcbiAgICAgICAgICAgICcgICAgPGEtZW50aXR5IGNhbWVyYT48L2EtZW50aXR5PlxcbicgK1xuICAgICAgICAgICAgJzwvYS1zY2VuZT5cXG4nKVxuICAgIH1cbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/arjs/arjs.js\n");

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