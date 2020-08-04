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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entities/buildScene.js":
/*!************************************!*\
  !*** ./src/entities/buildScene.js ***!
  \************************************/
/*! exports provided: camera, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"camera\", function() { return camera; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _entities_controllers_gameController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/controllers/gameController.js */ \"./src/entities/controllers/gameController.js\");\n\r\n\r\nconst scene = new THREE.Scene();\r\n\r\nconst camera = new THREE.PerspectiveCamera(\r\n  75,\r\n  window.innerWidth / window.innerHeight,\r\n  0.1,\r\n  1000\r\n);\r\ncamera.position.z = 5;\r\n\r\nconst pointLight = new THREE.PointLight(0xffffff);\r\ncamera.add(pointLight);\r\npointLight.castShadow = true;\r\nscene.add(camera);\r\nscene.fog = new THREE.FogExp2(0xcccccc, 0.0015);\r\n\r\naddLights();\r\n\r\nconst renderer = new THREE.WebGLRenderer();\r\nrenderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));\r\nrenderer.setClearColor(scene.fog.color);\r\nrenderer.setSize(window.innerWidth, window.innerHeight);\r\ndocument.body.appendChild(renderer.domElement);\r\n\r\nconst objLoader = new THREE.OBJLoader();\r\nobjLoader.setPath(\"/blender-files/\");\r\n\r\nconst mtlLoader = new THREE.MTLLoader();\r\nmtlLoader.setPath(\"/blender-files/\");\r\n\r\nnew Promise((resolve) => {\r\n  console.log(\"ЗАГРУЗКА МОДЕЛЕЙ\");\r\n  mtlLoader.load(\"Tunnel.mtl\", (materials) => {\r\n    resolve(materials);\r\n  });\r\n}).then((materials) => {\r\n  materials.preload();\r\n  objLoader.setMaterials(materials);\r\n  objLoader.load(\"Tunnel.obj\", (object) => {    \r\n    scene.add(object);\r\n    console.log(\"ЗАГРУЗКА МОДЕЛЕЙ ЗАВЕРШЕНА\");\r\n    let download = document.getElementById(\"download\");\r\n    download.style.display = \"none\";\r\n    window.scrollTo(0, window.outerHeight);\r\n  });\r\n});\r\n\r\nfunction addLights() {\r\n  var lightOne = new THREE.DirectionalLight(0xffffff);\r\n  lightOne.position.set(1, 1, 1);\r\n  scene.add(lightOne);\r\n  // Add a second light with half the intensity\r\n  var lightTwo = new THREE.DirectionalLight(0xffffff, 0.5);\r\n  lightTwo.position.set(1, -1, -1);\r\n  scene.add(lightTwo);\r\n}\r\n\r\nfunction render() {\r\n  requestAnimationFrame(render);\r\n  renderer.render(scene, camera);\r\n  Object(_entities_controllers_gameController_js__WEBPACK_IMPORTED_MODULE_0__[\"animatePlayer\"])();\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/entities/buildScene.js?");

/***/ }),

/***/ "./src/entities/controllers/gameController.js":
/*!****************************************************!*\
  !*** ./src/entities/controllers/gameController.js ***!
  \****************************************************/
/*! exports provided: listenForPlayerMovement, animatePlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"listenForPlayerMovement\", function() { return listenForPlayerMovement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"animatePlayer\", function() { return animatePlayer; });\n/* harmony import */ var _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../entities/buildScene.js */ \"./src/entities/buildScene.js\");\n\r\n\r\nlet moveForward = false;\r\nlet moveBackward = false;\r\nlet cruiseControl = 0;\r\nlet switcher = 0;\r\n\r\nconst information = document.getElementById(\"switch\");\r\n\r\nfunction listenForPlayerMovement() {\r\n  // A key has been pressed\r\n  const onKeyDown = function (event) {\r\n    if (moveForward) {\r\n      return;\r\n    }\r\n    switch (event.keyCode) {\r\n      case 38: // up\r\n      case 87: // w\r\n        moveForward = true;\r\n        switcher === 4 ? (switcher = 4) : switcher++;\r\n        break;\r\n      case 40: // down\r\n      case 83: // s\r\n        moveBackward = true;\r\n        switcher === 0 ? (switcher = 0) : switcher--;\r\n        break;\r\n    }\r\n  };\r\n  // A key has been released\r\n  const onKeyUp = function (event) {\r\n    switch (event.keyCode) {\r\n      case 38: // up\r\n      case 87: // w\r\n        moveForward = false;\r\n        break;\r\n      case 40: // down\r\n      case 83: // s\r\n        moveBackward = false;\r\n        break;\r\n    }\r\n  };\r\n  // Add event listeners for when movement keys are pressed and released\r\n  document.addEventListener(\"keydown\", onKeyDown, false);\r\n  document.addEventListener(\"keyup\", onKeyUp, false);\r\n}\r\n\r\nfunction animatePlayer() {\r\n  if (!_entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"]) {\r\n    console.log(\"object camera corrupt\");\r\n    return;\r\n  }\r\n  if (moveForward) {\r\n    switch (switcher) {\r\n      case 1:\r\n        information.innerText = \"ПЕРЕДАЧА : 1\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0.2;\r\n        cruiseControl = 0.2;\r\n        break;\r\n      case 2:\r\n        information.innerText = \"ПЕРЕДАЧА : 2\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0.3;\r\n        cruiseControl = 0.3;\r\n        break;\r\n      case 3:\r\n        information.innerText = \"ПЕРЕДАЧА : 3\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0.5;\r\n        cruiseControl = 0.5;\r\n        break;\r\n      case 4:\r\n        information.innerText = \"ПЕРЕДАЧА : 4\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0.6;\r\n        cruiseControl = 0.6;\r\n        break;\r\n    }\r\n  }\r\n\r\n  if (moveBackward) {\r\n    switch (switcher) {\r\n      case 0:\r\n        information.innerText = \"ПЕРЕДАЧА : 0\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0;\r\n        cruiseControl = 0;\r\n        break;\r\n      case 1:\r\n        information.innerText = \"ПЕРЕДАЧА : 1\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0.1;\r\n        cruiseControl = 0.1;\r\n        break;\r\n      case 2:\r\n        information.innerText = \"ПЕРЕДАЧА : 2\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0.2;\r\n        cruiseControl = 0.2;\r\n        break;\r\n      case 3:\r\n        information.innerText = \"ПЕРЕДАЧА : 3\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0.3;\r\n        cruiseControl = 0.3;\r\n        break;\r\n      case 4:\r\n        information.innerText = \"ПЕРЕДАЧА : 4\";\r\n        _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= 0.4;\r\n        cruiseControl = 0.4;\r\n        break;\r\n    }\r\n  }\r\n\r\n  if (!(moveForward || moveBackward)) {\r\n    // No movement key being pressed. Stop movememnt\r\n    _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"camera\"].position.z -= cruiseControl;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/entities/controllers/gameController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/buildScene.js */ \"./src/entities/buildScene.js\");\n/* harmony import */ var _entities_controllers_gameController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/controllers/gameController.js */ \"./src/entities/controllers/gameController.js\");\n\r\n\r\n\r\nObject(_entities_buildScene_js__WEBPACK_IMPORTED_MODULE_0__[\"render\"])();\r\nObject(_entities_controllers_gameController_js__WEBPACK_IMPORTED_MODULE_1__[\"listenForPlayerMovement\"])();\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });