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

eval("window.onload = function () {\n  var defaultChar = \"Stromboli\";\n  var body = document.getElementById('body');\n  var url = new URL(window.location.href);\n  var getChar = url.searchParams.get('char');\n  var stories_json;\n\n  function loadJSON(callback) {\n    var xobj = new XMLHttpRequest();\n    xobj.overrideMimeType(\"application/json\");\n    xobj.open('GET', '../assets/stories/stories.json', false);\n\n    xobj.onreadystatechange = function () {\n      if (xobj.readyState == 4 && xobj.status == \"200\") {\n        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode\n        callback(xobj.responseText);\n      }\n    };\n\n    xobj.send(null);\n  }\n\n  loadJSON(function (response) {\n    // Parse JSON string into object\n    stories_json = JSON.parse(response);\n    filterCharResponse(stories_json);\n  });\n\n  function filterCharResponse(json) {\n    var obj = json['charakter'];\n    var setChar = defaultChar;\n\n    for (var i = 0; i < obj.length; i++) {\n      //check if there is a char in the URl, if not set it to default Char\n      if (obj[i].name == getChar) {\n        setChar = getChar;\n      }\n    } //Append HTML to body with the right Asset\n\n\n    insertHTML(setChar);\n  } //select parent elements\n\n\n  var buttonWrapper = document.getElementById('button_wrapper');\n  var directionaltarget = document.getElementById('directionaltarget'); //this function is needed to danymicaly load the chars\n\n  function insertHTML(_char) {\n    //load the gltf FIle\n    //jquery is used because its easy async load of the gltf file\n    $.getJSON('../assets/chars/' + _char + '/' + _char + '.gltf', function (json) {\n      //loop all animations\n      json.animations.forEach(function (element) {\n        //create button elements\n        var li = document.createElement('button');\n        li.setAttribute('class', 'animationBtn'); //append them to the dom element\n\n        li.appendChild(document.createTextNode(element.name)); //add devent listener to change the animation of the asset\n\n        li.addEventListener(\"click\", function () {\n          //animation-mixer defines the animation that is played\n          directionaltarget.setAttribute('animation-mixer', 'clip: ' + element.name);\n        }); //append all buttons to DOM\n\n        buttonWrapper.appendChild(li);\n      });\n    });\n    body.insertAdjacentHTML('beforeend', '<a-scene embedded\\n' + '         arjs=\"debugUIEnabled: false; sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960\"\\n' + '         vr-mode-ui=\"enabled: false\" device-orientation-permission-ui=\"enabled: false\"\\n' + '         artoolkit=\"sourceType: webcam;\"\\n' + '         outline\\n' + '         antialias=\"true\">\\n' + '    <a-assets>\\n' + '        <a-asset-item\\n' + '                id=\"asset\"\\n' + '                src=\"../assets/chars/' + _char + '/' + _char + '.gltf\"\\n' + '        ></a-asset-item>\\n' + '    </a-assets>\\n' + '    <a-marker type=\"pattern\" url=\"../assets/images/arjs/pattern/sae.patt\">\\n' + '        <a-entity light=\"type: point;\\n' + '        color: #fff;\\n' + '        distance: 50;\\n' + '        intensity: 2.5;\"\\n' + '                  position=\"0 5 0 \"></a-entity>\\n' + '        <a-entity\\n' + '                id=\"directionaltarget\"\\n' + '                rotation=\"-90 90 -90\"\\n' + '                scale=\"20 20 20\"\\n' + '                animation-mixer=\"clip: Neutral\"\\n' + '                position=\"0 0 1\"\\n' + '                gltf-model=\"#asset\"\\n' + '        ></a-entity>\\n' + '\\n' + '    </a-marker>\\n' + '    <a-entity camera></a-entity>\\n' + '</a-scene>\\n');\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJqcy9hcmpzLmpzPzdjNTgiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwiZGVmYXVsdENoYXIiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInVybCIsIlVSTCIsImxvY2F0aW9uIiwiaHJlZiIsImdldENoYXIiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJzdG9yaWVzX2pzb24iLCJsb2FkSlNPTiIsImNhbGxiYWNrIiwieG9iaiIsIlhNTEh0dHBSZXF1ZXN0Iiwib3ZlcnJpZGVNaW1lVHlwZSIsIm9wZW4iLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic2VuZCIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwiZmlsdGVyQ2hhclJlc3BvbnNlIiwianNvbiIsIm9iaiIsInNldENoYXIiLCJpIiwibGVuZ3RoIiwibmFtZSIsImluc2VydEhUTUwiLCJidXR0b25XcmFwcGVyIiwiZGlyZWN0aW9uYWx0YXJnZXQiLCJjaGFyIiwiJCIsImdldEpTT04iLCJhbmltYXRpb25zIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJsaSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImluc2VydEFkamFjZW50SFRNTCJdLCJtYXBwaW5ncyI6IkFBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxHQUFnQixZQUFZO0FBRXhCLE1BQU1DLFdBQVcsR0FBRyxXQUFwQjtBQUVBLE1BQU1DLElBQUksR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFFQSxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsR0FBSixDQUFRUCxNQUFNLENBQUNRLFFBQVAsQ0FBZ0JDLElBQXhCLENBQVY7QUFDQSxNQUFJQyxPQUFPLEdBQUdKLEdBQUcsQ0FBQ0ssWUFBSixDQUFpQkMs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LHlCQVBpQyxHQVFqQyw4QkFSaUMsR0FTakMsdUNBVGlDLEdBU1NaLEtBVFQsR0FTZ0IsR0FUaEIsR0FTc0JBLEtBVHRCLEdBUzZCLFVBVDdCLEdBVWpDLDRCQVZpQyxHQVdqQyxtQkFYaUMsR0FZakMsOEVBWmlDLEdBYWpDLHlDQWJpQyxHQWNqQyx3QkFkaUMsR0FlakMseUJBZmlDLEdBZ0JqQyw0QkFoQmlDLEdBaUJqQyxtREFqQmlDLEdBa0JqQyxxQkFsQmlDLEdBbUJqQywwQ0FuQmlDLEdBb0JqQyx5Q0FwQmlDLEdBcUJqQyxvQ0FyQmlDLEdBc0JqQyxtREF0QmlDLEdBdUJqQyxvQ0F2QmlDLEdBd0JqQyx1Q0F4QmlDLEdBeUJqQyx3QkF6QmlDLEdBMEJqQyxJQTFCaUMsR0EyQmpDLG1CQTNCaUMsR0E0QmpDLG9DQTVCaUMsR0E2QmpDLGNBN0JKO0FBOEJIO0FBQ0osQ0F2R0QiLCJmaWxlIjoiLi9zcmMvanMvYXJqcy9hcmpzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IGRlZmF1bHRDaGFyID0gXCJTdHJvbWJvbGlcIjtcblxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpO1xuXG4gICAgbGV0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIGxldCBnZXRDaGFyID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2NoYXInKTtcblxuICAgIGxldCBzdG9yaWVzX2pzb247XG5cbiAgICBmdW5jdGlvbiBsb2FkSlNPTihjYWxsYmFjaykge1xuICAgICAgICBsZXQgeG9iaiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4b2JqLm92ZXJyaWRlTWltZVR5cGUoXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgICB4b2JqLm9wZW4oJ0dFVCcsICcuLi9hc3NldHMvc3Rvcmllcy9zdG9yaWVzLmpzb24nLCBmYWxzZSk7XG4gICAgICAgIHhvYmoub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHhvYmoucmVhZHlTdGF0ZSA9PSA0ICYmIHhvYmouc3RhdHVzID09IFwiMjAwXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXF1aXJlZCB1c2Ugb2YgYW4gYW5vbnltb3VzIGNhbGxiYWNrIGFzIC5vcGVuIHdpbGwgTk9UIHJldHVybiBhIHZhbHVlIGJ1dCBzaW1wbHkgcmV0dXJucyB1bmRlZmluZWQgaW4gYXN5bmNocm9ub3VzIG1vZGVcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh4b2JqLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHhvYmouc2VuZChudWxsKTtcbiAgICB9XG5cbiAgICBsb2FkSlNPTigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gUGFyc2UgSlNPTiBzdHJpbmcgaW50byBvYmplY3RcbiAgICAgICAgc3Rvcmllc19qc29uID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgIGZpbHRlckNoYXJSZXNwb25zZShzdG9yaWVzX2pzb24pO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZmlsdGVyQ2hhclJlc3BvbnNlKGpzb24pIHtcbiAgICAgICAgbGV0IG9iaiA9IGpzb25bJ2NoYXJha3RlciddO1xuICAgICAgICBsZXQgc2V0Q2hhciA9IGRlZmF1bHRDaGFyO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy9jaGVjayBpZiB0aGVyZSBpcyBhIGNoYXIgaW4gdGhlIFVSbCwgaWYgbm90IHNldCBpdCB0byBkZWZhdWx0IENoYXJcbiAgICAgICAgICAgIGlmIChvYmpbaV0ubmFtZSA9PSBnZXRDaGFyKSB7XG4gICAgICAgICAgICAgICAgc2V0Q2hhciA9IGdldENoYXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9BcHBlbmQgSFRNTCB0byBib2R5IHdpdGggdGhlIHJpZ2h0IEFzc2V0XG4gICAgICAgIGluc2VydEhUTUwoc2V0Q2hhcik7XG4gICAgfVxuXG4gICAgLy9zZWxlY3QgcGFyZW50IGVsZW1lbnRzXG4gICAgY29uc3QgYnV0dG9uV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b25fd3JhcHBlcicpO1xuICAgIGNvbnN0IGRpcmVjdGlvbmFsdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpcmVjdGlvbmFsdGFyZ2V0Jyk7XG5cbiAgICAvL3RoaXMgZnVuY3Rpb24gaXMgbmVlZGVkIHRvIGRhbnltaWNhbHkgbG9hZCB0aGUgY2hhcnNcbiAgICBmdW5jdGlvbiBpbnNlcnRIVE1MKGNoYXIpIHtcblxuICAgICAgICAvL2xvYWQgdGhlIGdsdGYgRklsZVxuICAgICAgICAvL2pxdWVyeSBpcyB1c2VkIGJlY2F1c2UgaXRzIGVhc3kgYXN5bmMgbG9hZCBvZiB0aGUgZ2x0ZiBmaWxlXG4gICAgICAgICQuZ2V0SlNPTignLi4vYXNzZXRzL2NoYXJzLycrIGNoYXIgKycvJysgY2hhciArICcuZ2x0ZicsIGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgICAgICAgIC8vbG9vcCBhbGwgYW5pbWF0aW9uc1xuICAgICAgICAgICAganNvbi5hbmltYXRpb25zLmZvckVhY2goIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jcmVhdGUgYnV0dG9uIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdjbGFzcycsICdhbmltYXRpb25CdG4nKTtcbiAgICAgICAgICAgICAgICAvL2FwcGVuZCB0aGVtIHRvIHRoZSBkb20gZWxlbWVudFxuICAgICAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGVsZW1lbnQubmFtZSkpO1xuICAgICAgICAgICAgICAgIC8vYWRkIGRldmVudCBsaXN0ZW5lciB0byBjaGFuZ2UgdGhlIGFuaW1hdGlvbiBvZiB0aGUgYXNzZXRcbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvL2FuaW1hdGlvbi1taXhlciBkZWZpbmVzIHRoZSBhbmltYXRpb24gdGhhdCBpcyBwbGF5ZWRcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uYWx0YXJnZXQuc2V0QXR0cmlidXRlKCdhbmltYXRpb24tbWl4ZXInLCAnY2xpcDogJyArIGVsZW1lbnQubmFtZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9hcHBlbmQgYWxsIGJ1dHRvbnMgdG8gRE9NXG4gICAgICAgICAgICAgICAgYnV0dG9uV3JhcHBlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsICc8YS1zY2VuZSBlbWJlZGRlZFxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgIGFyanM9XCJkZWJ1Z1VJRW5hYmxlZDogZmFsc2U7IHNvdXJjZVR5cGU6IHdlYmNhbTsgc291cmNlV2lkdGg6MTI4MDsgc291cmNlSGVpZ2h0Ojk2MDsgZGlzcGxheVdpZHRoOiAxMjgwOyBkaXNwbGF5SGVpZ2h0OiA5NjBcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgIHZyLW1vZGUtdWk9XCJlbmFibGVkOiBmYWxzZVwiIGRldmljZS1vcmllbnRhdGlvbi1wZXJtaXNzaW9uLXVpPVwiZW5hYmxlZDogZmFsc2VcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgIGFydG9vbGtpdD1cInNvdXJjZVR5cGU6IHdlYmNhbTtcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgIG91dGxpbmVcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICBhbnRpYWxpYXM9XCJ0cnVlXCI+XFxuJyArXG4gICAgICAgICAgICAnICAgIDxhLWFzc2V0cz5cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIDxhLWFzc2V0LWl0ZW1cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgaWQ9XCJhc3NldFwiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIHNyYz1cIi4uL2Fzc2V0cy9jaGFycy8nICsgY2hhciArICcvJyArIGNoYXIgKyAnLmdsdGZcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgPjwvYS1hc3NldC1pdGVtPlxcbicgK1xuICAgICAgICAgICAgJyAgICA8L2EtYXNzZXRzPlxcbicgK1xuICAgICAgICAgICAgJyAgICA8YS1tYXJrZXIgdHlwZT1cInBhdHRlcm5cIiB1cmw9XCIuLi9hc3NldHMvaW1hZ2VzL2FyanMvcGF0dGVybi9zYWUucGF0dFwiPlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgPGEtZW50aXR5IGxpZ2h0PVwidHlwZTogcG9pbnQ7XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICBjb2xvcjogI2ZmZjtcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIGRpc3RhbmNlOiA1MDtcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIGludGVuc2l0eTogMi41O1wiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgICAgcG9zaXRpb249XCIwIDUgMCBcIj48L2EtZW50aXR5PlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgPGEtZW50aXR5XFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIGlkPVwiZGlyZWN0aW9uYWx0YXJnZXRcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICByb3RhdGlvbj1cIi05MCA5MCAtOTBcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBzY2FsZT1cIjIwIDIwIDIwXCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgICAgICAgICAgYW5pbWF0aW9uLW1peGVyPVwiY2xpcDogTmV1dHJhbFwiXFxuJyArXG4gICAgICAgICAgICAnICAgICAgICAgICAgICAgIHBvc2l0aW9uPVwiMCAwIDFcIlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgICAgICAgICBnbHRmLW1vZGVsPVwiI2Fzc2V0XCJcXG4nICtcbiAgICAgICAgICAgICcgICAgICAgID48L2EtZW50aXR5PlxcbicgK1xuICAgICAgICAgICAgJ1xcbicgK1xuICAgICAgICAgICAgJyAgICA8L2EtbWFya2VyPlxcbicgK1xuICAgICAgICAgICAgJyAgICA8YS1lbnRpdHkgY2FtZXJhPjwvYS1lbnRpdHk+XFxuJyArXG4gICAgICAgICAgICAnPC9hLXNjZW5lPlxcbicpXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/arjs/arjs.js\n");

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