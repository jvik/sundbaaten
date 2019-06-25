module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
const scraper_1 = __importDefault(__webpack_require__(/*! ./scraper */ "./src/scraper.ts"));
const app = express_1.default();
var IN_PROD = false;
process.argv.forEach((val, index) => {
    if (val === '-production') {
        IN_PROD = true;
        console.log('Production mode');
    }
});
if (IN_PROD) {
    dotenv_1.default.config({
        path: './.env',
    });
}
else {
    dotenv_1.default.config({
        path: './.env.dev',
    });
}
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.get('/api', (req, res) => __awaiter(this, void 0, void 0, function* () { return yield res.json(yield scraper_1.default); }));
// start the Express server
app.listen({ port: `${process.env.APP_PORT}` }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.APP_PORT}`);
});


/***/ }),

/***/ "./src/scraper.ts":
/*!************************!*\
  !*** ./src/scraper.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(__webpack_require__(/*! request-promise */ "request-promise"));
const cheerio_1 = __importDefault(__webpack_require__(/*! cheerio */ "cheerio"));
const url = 'https://www.sundbaten.no/';
const scraper = request_promise_1.default(url)
    .then(function (html) {
    let departures = {
        weekdayDepartures: [],
        saturdayDepartures: [],
        sundayDepartures: [],
    };
    const weekdaySelector = cheerio_1.default('#hverdager > tbody > tr > td', html);
    for (let i = 0; i < weekdaySelector.length; i++) {
        let departureSite = weekdaySelector[i].attribs['data-label'];
        let departureTime = weekdaySelector[i].children[0].data;
        departures.weekdayDepartures.push({
            departureSite: departureSite,
            departureTime: departureTime,
        });
    }
    const saturdaySelector = cheerio_1.default('#lordager > tbody > tr > td', html);
    for (let i = 0; i < saturdaySelector.length; i++) {
        let departureSite = saturdaySelector[i].attribs['data-label'];
        let departureTime = saturdaySelector[i].children[0].data;
        departures.saturdayDepartures.push({
            departureSite: departureSite,
            departureTime: departureTime,
        });
    }
    const sundaySelector = cheerio_1.default('#sondager > tbody > tr > td', html);
    for (let i = 0; i < sundaySelector.length; i++) {
        let departureSite = sundaySelector[i].attribs['data-label'];
        let departureTime = sundaySelector[i].children[0].data;
        departures.sundayDepartures.push({
            departureSite: departureSite,
            departureTime: departureTime,
        });
    }
    const jsonStringedDepartures = JSON.parse(JSON.stringify(departures));
    return jsonStringedDepartures;
})
    .catch(function (err) {
    throw new Error(err);
});
exports.default = scraper;


/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi babel-polyfill ./src/app.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */"babel-polyfill");
module.exports = __webpack_require__(/*! /Users/jvik/Documents/github-repos/privat/sundbaaten/bot/src/app.ts */"./src/app.ts");


/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ "cheerio":
/*!**************************!*\
  !*** external "cheerio" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyYXBlci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1wb2x5ZmlsbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoZWVyaW9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJkb3RlbnZcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicmVxdWVzdC1wcm9taXNlXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLGlGQUE4QjtBQUM5Qiw4RUFBNEI7QUFDNUIsNEZBQWdDO0FBRWhDLE1BQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUV0QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFFcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDbkMsSUFBSSxHQUFHLEtBQUssYUFBYSxFQUFFO1FBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDL0I7QUFDRixDQUFDLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxFQUFFO0lBQ1osZ0JBQU0sQ0FBQyxNQUFNLENBQUM7UUFDYixJQUFJLEVBQUUsUUFBUTtLQUNkLENBQUMsQ0FBQztDQUNIO0tBQU07SUFDTixnQkFBTSxDQUFDLE1BQU0sQ0FBQztRQUNiLElBQUksRUFBRSxZQUFZO0tBQ2xCLENBQUMsQ0FBQztDQUNIO0FBRUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLGdEQUFDLGFBQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLGlCQUFPLENBQUMsS0FBQyxDQUFDO0FBRW5FLDJCQUEyQjtBQUMzQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtJQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDNUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xDSCx5R0FBaUM7QUFDakMsaUZBQXdCO0FBRXhCLE1BQU0sR0FBRyxHQUFHLDJCQUEyQixDQUFDO0FBRXhDLE1BQU0sT0FBTyxHQUFHLHlCQUFFLENBQUMsR0FBRyxDQUFDO0tBQ3JCLElBQUksQ0FBQyxVQUFTLElBQUk7SUFDbEIsSUFBSSxVQUFVLEdBQUc7UUFDaEIsaUJBQWlCLEVBQUUsRUFBRTtRQUNyQixrQkFBa0IsRUFBRSxFQUFFO1FBQ3RCLGdCQUFnQixFQUFFLEVBQUU7S0FDcEIsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHLGlCQUFDLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEQsSUFBSSxhQUFhLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3RCxJQUFJLGFBQWEsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN4RCxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ2pDLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGFBQWEsRUFBRSxhQUFhO1NBQzVCLENBQUMsQ0FBQztLQUNIO0lBRUQsTUFBTSxnQkFBZ0IsR0FBRyxpQkFBQyxDQUFDLDZCQUE2QixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakQsSUFBSSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlELElBQUksYUFBYSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztZQUNsQyxhQUFhLEVBQUUsYUFBYTtZQUM1QixhQUFhLEVBQUUsYUFBYTtTQUM1QixDQUFDLENBQUM7S0FDSDtJQUVELE1BQU0sY0FBYyxHQUFHLGlCQUFDLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxhQUFhLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RCxJQUFJLGFBQWEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2RCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1lBQ2hDLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGFBQWEsRUFBRSxhQUFhO1NBQzVCLENBQUMsQ0FBQztLQUNIO0lBRUQsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUN0RSxPQUFPLHNCQUFzQixDQUFDO0FBQy9CLENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxVQUFTLEdBQUc7SUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUMsQ0FBQztBQUVKLGtCQUFlLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEdkIsMkM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsNEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgc2NyYXBlciBmcm9tICcuL3NjcmFwZXInO1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5cbnZhciBJTl9QUk9EID0gZmFsc2U7XG5cbnByb2Nlc3MuYXJndi5mb3JFYWNoKCh2YWwsIGluZGV4KSA9PiB7XG5cdGlmICh2YWwgPT09ICctcHJvZHVjdGlvbicpIHtcblx0XHRJTl9QUk9EID0gdHJ1ZTtcblx0XHRjb25zb2xlLmxvZygnUHJvZHVjdGlvbiBtb2RlJyk7XG5cdH1cbn0pO1xuXG5pZiAoSU5fUFJPRCkge1xuXHRkb3RlbnYuY29uZmlnKHtcblx0XHRwYXRoOiAnLi8uZW52Jyxcblx0fSk7XG59IGVsc2Uge1xuXHRkb3RlbnYuY29uZmlnKHtcblx0XHRwYXRoOiAnLi8uZW52LmRldicsXG5cdH0pO1xufVxuXG5hcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG5cdHJlcy5zZW5kKCdIZWxsbyB3b3JsZCEnKTtcbn0pO1xuXG5hcHAuZ2V0KCcvYXBpJywgYXN5bmMgKHJlcSwgcmVzKSA9PiBhd2FpdCByZXMuanNvbihhd2FpdCBzY3JhcGVyKSk7XG5cbi8vIHN0YXJ0IHRoZSBFeHByZXNzIHNlcnZlclxuYXBwLmxpc3Rlbih7IHBvcnQ6IGAke3Byb2Nlc3MuZW52LkFQUF9QT1JUfWAgfSwgKCkgPT4ge1xuXHRjb25zb2xlLmxvZyhg8J+agCBTZXJ2ZXIgcmVhZHkgYXQgaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LkFQUF9QT1JUfWApO1xufSk7XG4iLCJpbXBvcnQgcnAgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCAkIGZyb20gJ2NoZWVyaW8nO1xuXG5jb25zdCB1cmwgPSAnaHR0cHM6Ly93d3cuc3VuZGJhdGVuLm5vLyc7XG5cbmNvbnN0IHNjcmFwZXIgPSBycCh1cmwpXG5cdC50aGVuKGZ1bmN0aW9uKGh0bWwpIHtcblx0XHRsZXQgZGVwYXJ0dXJlcyA9IHtcblx0XHRcdHdlZWtkYXlEZXBhcnR1cmVzOiBbXSxcblx0XHRcdHNhdHVyZGF5RGVwYXJ0dXJlczogW10sXG5cdFx0XHRzdW5kYXlEZXBhcnR1cmVzOiBbXSxcblx0XHR9O1xuXG5cdFx0Y29uc3Qgd2Vla2RheVNlbGVjdG9yID0gJCgnI2h2ZXJkYWdlciA+IHRib2R5ID4gdHIgPiB0ZCcsIGh0bWwpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgd2Vla2RheVNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgZGVwYXJ0dXJlU2l0ZSA9IHdlZWtkYXlTZWxlY3RvcltpXS5hdHRyaWJzWydkYXRhLWxhYmVsJ107XG5cdFx0XHRsZXQgZGVwYXJ0dXJlVGltZSA9IHdlZWtkYXlTZWxlY3RvcltpXS5jaGlsZHJlblswXS5kYXRhO1xuXHRcdFx0ZGVwYXJ0dXJlcy53ZWVrZGF5RGVwYXJ0dXJlcy5wdXNoKHtcblx0XHRcdFx0ZGVwYXJ0dXJlU2l0ZTogZGVwYXJ0dXJlU2l0ZSxcblx0XHRcdFx0ZGVwYXJ0dXJlVGltZTogZGVwYXJ0dXJlVGltZSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNhdHVyZGF5U2VsZWN0b3IgPSAkKCcjbG9yZGFnZXIgPiB0Ym9keSA+IHRyID4gdGQnLCBodG1sKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNhdHVyZGF5U2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBkZXBhcnR1cmVTaXRlID0gc2F0dXJkYXlTZWxlY3RvcltpXS5hdHRyaWJzWydkYXRhLWxhYmVsJ107XG5cdFx0XHRsZXQgZGVwYXJ0dXJlVGltZSA9IHNhdHVyZGF5U2VsZWN0b3JbaV0uY2hpbGRyZW5bMF0uZGF0YTtcblx0XHRcdGRlcGFydHVyZXMuc2F0dXJkYXlEZXBhcnR1cmVzLnB1c2goe1xuXHRcdFx0XHRkZXBhcnR1cmVTaXRlOiBkZXBhcnR1cmVTaXRlLFxuXHRcdFx0XHRkZXBhcnR1cmVUaW1lOiBkZXBhcnR1cmVUaW1lLFxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc3VuZGF5U2VsZWN0b3IgPSAkKCcjc29uZGFnZXIgPiB0Ym9keSA+IHRyID4gdGQnLCBodG1sKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHN1bmRheVNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgZGVwYXJ0dXJlU2l0ZSA9IHN1bmRheVNlbGVjdG9yW2ldLmF0dHJpYnNbJ2RhdGEtbGFiZWwnXTtcblx0XHRcdGxldCBkZXBhcnR1cmVUaW1lID0gc3VuZGF5U2VsZWN0b3JbaV0uY2hpbGRyZW5bMF0uZGF0YTtcblx0XHRcdGRlcGFydHVyZXMuc3VuZGF5RGVwYXJ0dXJlcy5wdXNoKHtcblx0XHRcdFx0ZGVwYXJ0dXJlU2l0ZTogZGVwYXJ0dXJlU2l0ZSxcblx0XHRcdFx0ZGVwYXJ0dXJlVGltZTogZGVwYXJ0dXJlVGltZSxcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGNvbnN0IGpzb25TdHJpbmdlZERlcGFydHVyZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRlcGFydHVyZXMpKTtcblx0XHRyZXR1cm4ganNvblN0cmluZ2VkRGVwYXJ0dXJlcztcblx0fSlcblx0LmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHRcdHRocm93IG5ldyBFcnJvcihlcnIpO1xuXHR9KTtcblxuZXhwb3J0IGRlZmF1bHQgc2NyYXBlcjtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXBvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoZWVyaW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVxdWVzdC1wcm9taXNlXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=