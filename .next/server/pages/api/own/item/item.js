"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/own/item/item";
exports.ids = ["pages/api/own/item/item"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "iron-session":
/*!*******************************!*\
  !*** external "iron-session" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("iron-session");;

/***/ }),

/***/ "(api)/./lib/iron_session.ts":
/*!*****************************!*\
  !*** ./lib/iron_session.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sessionOptions\": () => (/* binding */ sessionOptions),\n/* harmony export */   \"sessionOptionsMagicLink\": () => (/* binding */ sessionOptionsMagicLink)\n/* harmony export */ });\nconst sessionOptions = {\n    password: process.env.JWT_SECRET,\n    cookieName: \"iron-session-token\",\n    cookieOptions: {\n        maxAge: 60 * 60 * 24 * 30,\n        httpOnly: true,\n        sameSite: \"strict\",\n        secure: \"development\" === \"production\",\n        path: \"/\"\n    }\n};\nconst sessionOptionsMagicLink = {\n    password: process.env.JWT_SECRET,\n    cookieName: \"iron-session-token\",\n    cookieOptions: {\n        maxAge: 60 * 60 * 24 * 30,\n        httpOnly: true,\n        sameSite: \"strict\",\n        secure: \"development\" === \"production\",\n        path: \"/\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvaXJvbl9zZXNzaW9uLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBR08sTUFBTUEsY0FBYyxHQUF1QjtJQUNoREMsUUFBUSxFQUFFQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsVUFBVTtJQUNoQ0MsVUFBVSxFQUFFLG9CQUFvQjtJQUNoQ0MsYUFBYSxFQUFFO1FBQ2JDLE1BQU0sRUFBRSxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFO1FBQ25CQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxRQUFRLEVBQUUsUUFBUTtRQUNsQkMsTUFBTSxFQUFFUixhQVZDLEtBVXdCLFlBQVk7UUFDN0NTLElBQUksRUFBRSxHQUFHO0tBQ1Y7Q0FDRixDQUFDO0FBRUssTUFBTUMsdUJBQXVCLEdBQXVCO0lBQ3pEWCxRQUFRLEVBQUVDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVO0lBQ2hDQyxVQUFVLEVBQUUsb0JBQW9CO0lBQ2hDQyxhQUFhLEVBQUU7UUFDYkMsTUFBTSxFQUFFLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUU7UUFDbkJDLFFBQVEsRUFBRSxJQUFJO1FBQ2RDLFFBQVEsRUFBRSxRQUFRO1FBQ2xCQyxNQUFNLEVBQUVSLGFBdEJDLEtBc0J3QixZQUFZO1FBQzdDUyxJQUFJLEVBQUUsR0FBRztLQUNWO0NBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2tvbGxhYi8uL2xpYi9pcm9uX3Nlc3Npb24udHM/YjNhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJcm9uU2Vzc2lvbk9wdGlvbnMgfSBmcm9tIFwiaXJvbi1zZXNzaW9uXCI7XG5pbXBvcnQgeyBVc2VyU2Vzc2lvbiB9IGZyb20gJy4vdHlwZXMvdXNlcic7XG5cbmV4cG9ydCBjb25zdCBzZXNzaW9uT3B0aW9uczogSXJvblNlc3Npb25PcHRpb25zID0ge1xuICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCBhcyBzdHJpbmcsXG4gIGNvb2tpZU5hbWU6IFwiaXJvbi1zZXNzaW9uLXRva2VuXCIsXG4gIGNvb2tpZU9wdGlvbnM6IHtcbiAgICBtYXhBZ2U6IDYwKjYwKjI0KjMwLFxuICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgIHNhbWVTaXRlOiBcInN0cmljdFwiLFxuICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxuICAgIHBhdGg6IFwiL1wiLFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHNlc3Npb25PcHRpb25zTWFnaWNMaW5rOiBJcm9uU2Vzc2lvbk9wdGlvbnMgPSB7XG4gIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIGFzIHN0cmluZyxcbiAgY29va2llTmFtZTogXCJpcm9uLXNlc3Npb24tdG9rZW5cIixcbiAgY29va2llT3B0aW9uczoge1xuICAgIG1heEFnZTogNjAqNjAqMjQqMzAsXG4gICAgaHR0cE9ubHk6IHRydWUsXG4gICAgc2FtZVNpdGU6IFwic3RyaWN0XCIsXG4gICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgcGF0aDogXCIvXCIsXG4gIH0sXG59O1xuXG5kZWNsYXJlIG1vZHVsZSBcImlyb24tc2Vzc2lvblwiIHtcbiAgaW50ZXJmYWNlIElyb25TZXNzaW9uRGF0YSB7XG4gICAgdXNlclNlc3Npb246IFVzZXJTZXNzaW9uO1xuICB9XG59Il0sIm5hbWVzIjpbInNlc3Npb25PcHRpb25zIiwicGFzc3dvcmQiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImNvb2tpZU5hbWUiLCJjb29raWVPcHRpb25zIiwibWF4QWdlIiwiaHR0cE9ubHkiLCJzYW1lU2l0ZSIsInNlY3VyZSIsInBhdGgiLCJzZXNzaW9uT3B0aW9uc01hZ2ljTGluayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/iron_session.ts\n");

/***/ }),

/***/ "(api)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nlet prisma;\nif (false) {} else {\n    let globalWithPrisma = global;\n    if (!globalWithPrisma.prisma) {\n        globalWithPrisma.prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    }\n    prisma = globalWithPrisma.prisma;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvcHJpc21hLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxJQUFJQyxNQUFNO0FBRVYsSUFBSUMsS0FBcUMsRUFBRSxFQUUxQyxNQUFNO0lBQ0wsSUFBSUMsZ0JBQWdCLEdBQUdDLE1BQU07SUFHN0IsSUFBSSxDQUFDRCxnQkFBZ0IsQ0FBQ0YsTUFBTSxFQUFFO1FBQzVCRSxnQkFBZ0IsQ0FBQ0YsTUFBTSxHQUFHLElBQUlELHdEQUFZLEVBQUUsQ0FBQztLQUM5QztJQUNEQyxNQUFNLEdBQUdFLGdCQUFnQixDQUFDRixNQUFNLENBQUM7Q0FDbEM7QUFFRCxpRUFBZUEsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29sbGFiLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcblxubGV0IHByaXNtYTogUHJpc21hQ2xpZW50O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBwcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KCk7XG59IGVsc2Uge1xuICBsZXQgZ2xvYmFsV2l0aFByaXNtYSA9IGdsb2JhbCBhcyB0eXBlb2YgZ2xvYmFsVGhpcyAmIHtcbiAgICBwcmlzbWE6IFByaXNtYUNsaWVudFxuICB9XG4gIGlmICghZ2xvYmFsV2l0aFByaXNtYS5wcmlzbWEpIHtcbiAgICBnbG9iYWxXaXRoUHJpc21hLnByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcbiAgfVxuICBwcmlzbWEgPSBnbG9iYWxXaXRoUHJpc21hLnByaXNtYTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYSIsInByb2Nlc3MiLCJnbG9iYWxXaXRoUHJpc21hIiwiZ2xvYmFsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/prisma.ts\n");

/***/ }),

/***/ "(api)/./lib/types/item.ts":
/*!***************************!*\
  !*** ./lib/types/item.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AccessLevel\": () => (/* binding */ AccessLevel),\n/* harmony export */   \"Category\": () => (/* binding */ Category),\n/* harmony export */   \"ItemType\": () => (/* binding */ ItemType),\n/* harmony export */   \"VisibilityLevel\": () => (/* binding */ VisibilityLevel)\n/* harmony export */ });\nvar Category;\n(function(Category) {\n    Category[\"LIST\"] = \"list\";\n})(Category || (Category = {}));\nvar ItemType;\n(function(ItemType) {\n    ItemType[\"GENERAL\"] = \"GENERAL\";\n    ItemType[\"ASSIGNMENT\"] = \"ASSIGNMENT\";\n    ItemType[\"REMINDER\"] = \"REMINDER\";\n    ItemType[\"NOTE\"] = \"NOTE\";\n    ItemType[\"MEETING\"] = \"MEETING\";\n    ItemType[\"PROJECT\"] = \"PROJECT\";\n    ItemType[\"TEST\"] = \"TEST\";\n})(ItemType || (ItemType = {}));\nvar AccessLevel;\n(function(AccessLevel) {\n    AccessLevel[\"ADMIN\"] = \"ADMIN\";\n    AccessLevel[\"PUBLIC\"] = \"PUBLIC\";\n})(AccessLevel || (AccessLevel = {}));\nvar VisibilityLevel;\n(function(VisibilityLevel) {\n    VisibilityLevel[\"PRIVATE\"] = \"PRIVATE\";\n    VisibilityLevel[\"PUBLIC\"] = \"PUBLIC\";\n})(VisibilityLevel || (VisibilityLevel = {}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvdHlwZXMvaXRlbS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFFTyxRQUVOO1VBRldBLFFBQVE7SUFBUkEsUUFBUSxDQUNsQkMsTUFBSSxJQUFHLE1BQU07R0FESEQsUUFBUSxLQUFSQSxRQUFRO0lBSWIsUUFRTjtVQVJXRSxRQUFRO0lBQVJBLFFBQVEsQ0FDbEJDLFNBQU8sSUFBUEEsU0FBTztJQURHRCxRQUFRLENBRWxCRSxZQUFVLElBQVZBLFlBQVU7SUFGQUYsUUFBUSxDQUdsQkcsVUFBUSxJQUFSQSxVQUFRO0lBSEVILFFBQVEsQ0FJbEJJLE1BQUksSUFBSkEsTUFBSTtJQUpNSixRQUFRLENBS2xCSyxTQUFPLElBQVBBLFNBQU87SUFMR0wsUUFBUSxDQU1sQk0sU0FBTyxJQUFQQSxTQUFPO0lBTkdOLFFBQVEsQ0FPbEJPLE1BQUksSUFBSkEsTUFBSTtHQVBNUCxRQUFRLEtBQVJBLFFBQVE7SUFVYixXQUdOO1VBSFdRLFdBQVc7SUFBWEEsV0FBVyxDQUNyQkMsT0FBSyxJQUFMQSxPQUFLO0lBREtELFdBQVcsQ0FFckJFLFFBQU0sSUFBTkEsUUFBTTtHQUZJRixXQUFXLEtBQVhBLFdBQVc7SUFLaEIsZUFHTjtVQUhXRyxlQUFlO0lBQWZBLGVBQWUsQ0FDekJDLFNBQU8sSUFBUEEsU0FBTztJQURHRCxlQUFlLENBRXpCRCxRQUFNLElBQU5BLFFBQU07R0FGSUMsZUFBZSxLQUFmQSxlQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29sbGFiLy4vbGliL3R5cGVzL2l0ZW0udHM/NDEzZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGVja0RhdGFJdGVtIH0gZnJvbSAnLi9saXN0JztcblxuZXhwb3J0IGVudW0gQ2F0ZWdvcnkge1xuICBMSVNUID0gJ2xpc3QnLFxufVxuXG5leHBvcnQgZW51bSBJdGVtVHlwZSB7XG4gIEdFTkVSQUwgPSAnR0VORVJBTCcsXG4gIEFTU0lHTk1FTlQgPSAnQVNTSUdOTUVOVCcsXG4gIFJFTUlOREVSID0gJ1JFTUlOREVSJyxcbiAgTk9URSA9ICdOT1RFJyxcbiAgTUVFVElORyA9ICdNRUVUSU5HJyxcbiAgUFJPSkVDVCA9ICdQUk9KRUNUJyxcbiAgVEVTVCA9ICdURVNUJyxcbn1cblxuZXhwb3J0IGVudW0gQWNjZXNzTGV2ZWwge1xuICBBRE1JTiA9ICdBRE1JTicsXG4gIFBVQkxJQyA9ICdQVUJMSUMnLFxufVxuXG5leHBvcnQgZW51bSBWaXNpYmlsaXR5TGV2ZWwge1xuICBQUklWQVRFID0gJ1BSSVZBVEUnLFxuICBQVUJMSUMgPSAnUFVCTElDJyxcbn1cblxuZXhwb3J0IHR5cGUgSXRlbSA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjYXRlZ29yeT86IENhdGVnb3J5O1xuICBjYXRlZ29yeV9pZDogbnVtYmVyO1xuICBpdGVtX3R5cGU6IEl0ZW1UeXBlO1xuICBkYXRlX3R6X3NlbnNpdGl2ZT86IERhdGU7XG4gIGRhdGVfdHpfc2Vuc2l0aXZlX2VuZD86IERhdGU7XG4gIHRpbWVfc2Vuc2l0aXZlX2ZsYWc6IGJvb2xlYW47XG4gIGRhdGVfcmFuZ2VfZmxhZzogYm9vbGVhbjtcbiAgZGF0ZV90el9pbnNlbnNpdGl2ZT86IHN0cmluZztcbiAgZGF0ZV90el9pbnNlbnNpdGl2ZV9lbmQ/OiBzdHJpbmc7XG4gIHBlcm1pc3Npb25fbGV2ZWw6IFZpc2liaWxpdHlMZXZlbDtcbiAgY3JlYXRlZF9ieV9pZDogbnVtYmVyO1xuICBsYXN0X21vZGlmaWVkX2J5X2lkOiBudW1iZXI7XG4gIGNyZWF0ZWRfYXQ6IERhdGU7XG59O1xuXG5leHBvcnQgdHlwZSBJdGVtUGVybWlzc2lvbiA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgaXRlbV9pZDogbnVtYmVyO1xuICB1c2VyX2lkOiBudW1iZXI7XG4gIGNyZWF0ZWRfYXQ/OiBEYXRlO1xufTtcblxuZXhwb3J0IHR5cGUgQ3JlYXRlSXRlbSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgY2F0ZWdvcnk/OiBDYXRlZ29yeTtcbiAgY2F0ZWdvcnlfaWQ/OiBudW1iZXI7XG4gIGl0ZW1fdHlwZTogSXRlbVR5cGU7XG4gIGRhdGVfdHpfc2Vuc2l0aXZlPzogRGF0ZTtcbiAgZGF0ZV90el9zZW5zaXRpdmVfZW5kPzogRGF0ZTtcbiAgdGltZV9zZW5zaXRpdmVfZmxhZzogYm9vbGVhbjtcbiAgZGF0ZV9yYW5nZV9mbGFnOiBib29sZWFuO1xuICBkYXRlX3R6X2luc2Vuc2l0aXZlPzogc3RyaW5nO1xuICBkYXRlX3R6X2luc2Vuc2l0aXZlX2VuZD86IHN0cmluZztcbiAgcGVybWlzc2lvbl9sZXZlbDogVmlzaWJpbGl0eUxldmVsO1xuICBpdGVtX3Blcm1pc3Npb25zPzogQ2hlY2tEYXRhSXRlbVtdO1xufTtcblxuZXhwb3J0IHR5cGUgRWRpdEl0ZW0gPSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGNhdGVnb3J5PzogQ2F0ZWdvcnk7XG4gIGNhdGVnb3J5X2lkPzogbnVtYmVyO1xuICBpdGVtX3R5cGU6IEl0ZW1UeXBlO1xuICBkYXRlX3R6X3NlbnNpdGl2ZT86IERhdGU7XG4gIGRhdGVfdHpfc2Vuc2l0aXZlX2VuZD86IERhdGU7XG4gIHRpbWVfc2Vuc2l0aXZlX2ZsYWc6IGJvb2xlYW47XG4gIGRhdGVfcmFuZ2VfZmxhZzogYm9vbGVhbjtcbiAgZGF0ZV90el9pbnNlbnNpdGl2ZT86IHN0cmluZztcbiAgZGF0ZV90el9pbnNlbnNpdGl2ZV9lbmQ/OiBzdHJpbmc7XG4gIHBlcm1pc3Npb25fbGV2ZWw6IFZpc2liaWxpdHlMZXZlbDtcbiAgaXRlbV9wZXJtaXNzaW9uczogQ2hlY2tEYXRhSXRlbVtdO1xuICBhY3RpdmU6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBJdGVtU2FmZSA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgY2F0ZWdvcnk/OiBDYXRlZ29yeTtcbiAgY2F0ZWdvcnlfaWQ/OiBudW1iZXI7XG4gIGl0ZW1fdHlwZTogSXRlbVR5cGU7XG4gIGRhdGVfdHpfc2Vuc2l0aXZlPzogRGF0ZTtcbiAgZGF0ZV90el9zZW5zaXRpdmVfZW5kPzogRGF0ZTtcbiAgdGltZV9zZW5zaXRpdmVfZmxhZzogYm9vbGVhbjtcbiAgZGF0ZV9yYW5nZV9mbGFnOiBib29sZWFuO1xuICBkYXRlX3R6X2luc2Vuc2l0aXZlPzogc3RyaW5nO1xuICBkYXRlX3R6X2luc2Vuc2l0aXZlX2VuZD86IHN0cmluZztcbiAgcGVybWlzc2lvbl9sZXZlbDogVmlzaWJpbGl0eUxldmVsO1xuICBjcmVhdGVkX2J5X2lkOiBudW1iZXI7XG4gIGxhc3RfbW9kaWZpZWRfYnlfaWQ6IG51bWJlcjtcbiAgYWN0aXZlOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgSXRlbVNhZmVTdGF0ZSA9IHtcbiAgaWQ/OiBudW1iZXI7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBjYXRlZ29yeT86IENhdGVnb3J5O1xuICBjYXRlZ29yeV9pZD86IG51bWJlcjtcbiAgaXRlbV90eXBlPzogSXRlbVR5cGU7XG4gIGRhdGVfdHpfc2Vuc2l0aXZlPzogRGF0ZTtcbiAgZGF0ZV90el9zZW5zaXRpdmVfZW5kPzogRGF0ZTtcbiAgdGltZV9zZW5zaXRpdmVfZmxhZz86IGJvb2xlYW47XG4gIGRhdGVfcmFuZ2VfZmxhZz86IGJvb2xlYW47XG4gIGRhdGVfdHpfaW5zZW5zaXRpdmU/OiBzdHJpbmc7XG4gIGRhdGVfdHpfaW5zZW5zaXRpdmVfZW5kPzogc3RyaW5nO1xuICBwZXJtaXNzaW9uX2xldmVsPzogVmlzaWJpbGl0eUxldmVsO1xuICBjcmVhdGVkX2J5X2lkPzogbnVtYmVyO1xuICBsYXN0X21vZGlmaWVkX2J5X2lkPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgSXRlbVl1cFZhbGlkYXRpb25FcnJvciA9IHtcbiAgbmFtZTogYm9vbGVhbjtcbiAgY2F0ZWdvcnk6IGJvb2xlYW47XG4gIGNhdGVnb3J5X2lkOiBib29sZWFuO1xuICBpdGVtX3R5cGU6IGJvb2xlYW47XG4gIHBlcm1pc3Npb25fbGV2ZWw6IGJvb2xlYW47XG4gIGRlc2NyaXB0aW9uOiBib29sZWFuO1xuICBkYXRlX3R6X3NlbnNpdGl2ZTogYm9vbGVhbjtcbiAgZGF0ZV90el9zZW5zaXRpdmVfZW5kOiBib29sZWFuO1xuICB0aW1lX3R6X3NlbnNpdGl2ZTogYm9vbGVhbjtcbiAgdGltZV90el9zZW5zaXRpdmVfZW5kOiBib29sZWFuO1xuICB0aW1lX3NlbnNpdGl2ZV9mbGFnOiBib29sZWFuO1xuICBkYXRlX3JhbmdlX2ZsYWc6IGJvb2xlYW47XG4gIGRhdGVfdHpfaW5zZW5zaXRpdmU6IGJvb2xlYW47XG4gIGRhdGVfdHpfaW5zZW5zaXRpdmVfZW5kOiBib29sZWFuO1xuICBsYXN0X21vZGlmaWVkX2J5X2lkOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgSXRlbUVkaXRZdXBWYWxpZGF0aW9uRXJyb3IgPSB7XG4gIGlkOiBib29sZWFuO1xuICBuYW1lOiBib29sZWFuO1xuICBjYXRlZ29yeTogYm9vbGVhbjtcbiAgY2F0ZWdvcnlfaWQ6IGJvb2xlYW47XG4gIGl0ZW1fdHlwZTogYm9vbGVhbjtcbiAgcGVybWlzc2lvbl9sZXZlbDogYm9vbGVhbjtcbiAgZGVzY3JpcHRpb246IGJvb2xlYW47XG4gIGRhdGVfdHpfc2Vuc2l0aXZlOiBib29sZWFuO1xuICBkYXRlX3R6X3NlbnNpdGl2ZV9lbmQ6IGJvb2xlYW47XG4gIHRpbWVfdHpfc2Vuc2l0aXZlOiBib29sZWFuO1xuICB0aW1lX3R6X3NlbnNpdGl2ZV9lbmQ6IGJvb2xlYW47XG4gIHRpbWVfc2Vuc2l0aXZlX2ZsYWc6IGJvb2xlYW47XG4gIGRhdGVfcmFuZ2VfZmxhZzogYm9vbGVhbjtcbiAgZGF0ZV90el9pbnNlbnNpdGl2ZTogYm9vbGVhbjtcbiAgZGF0ZV90el9pbnNlbnNpdGl2ZV9lbmQ6IGJvb2xlYW47XG4gIGxhc3RfbW9kaWZpZWRfYnlfaWQ6IGJvb2xlYW47XG59O1xuIl0sIm5hbWVzIjpbIkNhdGVnb3J5IiwiTElTVCIsIkl0ZW1UeXBlIiwiR0VORVJBTCIsIkFTU0lHTk1FTlQiLCJSRU1JTkRFUiIsIk5PVEUiLCJNRUVUSU5HIiwiUFJPSkVDVCIsIlRFU1QiLCJBY2Nlc3NMZXZlbCIsIkFETUlOIiwiUFVCTElDIiwiVmlzaWJpbGl0eUxldmVsIiwiUFJJVkFURSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/types/item.ts\n");

/***/ }),

/***/ "(api)/./pages/api/own/item/item.ts":
/*!************************************!*\
  !*** ./pages/api/own/item/item.ts ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var iron_session_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iron-session/next */ \"(api)/./node_modules/iron-session/next/dist/index.mjs\");\n/* harmony import */ var lib_iron_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib/iron_session */ \"(api)/./lib/iron_session.ts\");\n/* harmony import */ var lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib/prisma */ \"(api)/./lib/prisma.ts\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var lib_types_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib/types/item */ \"(api)/./lib/types/item.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([iron_session_next__WEBPACK_IMPORTED_MODULE_0__]);\niron_session_next__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,iron_session_next__WEBPACK_IMPORTED_MODULE_0__.withIronSessionApiRoute)(handle, lib_iron_session__WEBPACK_IMPORTED_MODULE_1__.sessionOptions));\nasync function handle(req, res) {\n    if (req.method === \"GET\") {\n        console.log(req.query);\n        try {\n            const result = await lib_prisma__WEBPACK_IMPORTED_MODULE_2__[\"default\"].item.findMany({\n                where: {\n                    created_by_id: req.session.userSession.id,\n                    category: null,\n                    permission_level: _prisma_client__WEBPACK_IMPORTED_MODULE_3__.VisibilityLevel[\"private\"],\n                    item_permissions: {\n                        some: {\n                            user_id: req.session.userSession.id\n                        }\n                    }\n                },\n                orderBy: {\n                    item_type: \"asc\"\n                }\n            });\n            const resultSafe = [];\n            result.forEach((row)=>{\n                const itemRow = {\n                    id: row.id,\n                    name: row.name,\n                    description: row.description ?? undefined,\n                    category: undefined,\n                    category_id: undefined,\n                    item_type: lib_types_item__WEBPACK_IMPORTED_MODULE_4__.ItemType[row.item_type.toUpperCase()],\n                    date_tz_sensitive: row.date_tz_sensitive ?? undefined,\n                    date_tz_sensitive_end: row.date_tz_sensitive_end ?? undefined,\n                    time_sensitive_flag: row.time_sensitive_flag,\n                    date_range_flag: row.date_range_flag,\n                    date_tz_insensitive: row.date_tz_insensitive ?? undefined,\n                    date_tz_insensitive_end: row.date_tz_insensitive_end ?? undefined,\n                    permission_level: lib_types_item__WEBPACK_IMPORTED_MODULE_4__.VisibilityLevel[row.permission_level.toUpperCase()],\n                    created_by_id: row.created_by_id,\n                    last_modified_by_id: row.last_modified_by_id,\n                    active: row.active\n                };\n                resultSafe.push(itemRow);\n            });\n            return res.json(resultSafe);\n        } catch (error) {\n            return res.json(error);\n        }\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvb3duL2l0ZW0vaXRlbS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTREO0FBRVY7QUFDbEI7QUFDcUU7QUFDdEI7QUFFL0UsaUVBQWVBLDBFQUF1QixDQUFDTSxNQUFNLEVBQUVMLDREQUFjLENBQUM7QUFFOUQsZUFBZUssTUFBTSxDQUFDQyxHQUFtQixFQUFDQyxHQUFvQixFQUFDO0lBQzdELElBQUdELEdBQUcsQ0FBQ0UsTUFBTSxLQUFLLEtBQUssRUFBQztRQUN0QkMsT0FBTyxDQUFDQyxHQUFHLENBQUNKLEdBQUcsQ0FBQ0ssS0FBSyxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNQyxNQUFNLEdBQUcsTUFBTVgsZ0VBQW9CLENBQUM7Z0JBQ3hDYyxLQUFLLEVBQUU7b0JBQ0xDLGFBQWEsRUFBRVYsR0FBRyxDQUFDVyxPQUFPLENBQUNDLFdBQVcsQ0FBQ0MsRUFBRTtvQkFDekNDLFFBQVEsRUFBRSxJQUFJO29CQUNkQyxnQkFBZ0IsRUFBRWxCLHNFQUE2QjtvQkFDL0NvQixnQkFBZ0IsRUFBRTt3QkFDaEJDLElBQUksRUFBRTs0QkFDSkMsT0FBTyxFQUFFbkIsR0FBRyxDQUFDVyxPQUFPLENBQUNDLFdBQVcsQ0FBQ0MsRUFBRTt5QkFDcEM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0RPLE9BQU8sRUFBRTtvQkFDUEMsU0FBUyxFQUFFLEtBQUs7aUJBQ2pCO2FBQ0YsQ0FBQztZQUNGLE1BQU1DLFVBQVUsR0FBZSxFQUFFO1lBQ2pDaEIsTUFBTSxDQUFDaUIsT0FBTyxDQUFDQyxDQUFBQSxHQUFHLEdBQUc7Z0JBQ25CLE1BQU1DLE9BQU8sR0FBYTtvQkFDeEJaLEVBQUUsRUFBRVcsR0FBRyxDQUFDWCxFQUFFO29CQUNWYSxJQUFJLEVBQUVGLEdBQUcsQ0FBQ0UsSUFBSTtvQkFDZEMsV0FBVyxFQUFFSCxHQUFHLENBQUNHLFdBQVcsSUFBSUMsU0FBUztvQkFDekNkLFFBQVEsRUFBRWMsU0FBUztvQkFDbkJDLFdBQVcsRUFBRUQsU0FBUztvQkFDdEJQLFNBQVMsRUFBRXZCLG9EQUFRLENBQUMwQixHQUFHLENBQUNILFNBQVMsQ0FBQ1MsV0FBVyxFQUFFLENBQTBCO29CQUN6RUMsaUJBQWlCLEVBQUVQLEdBQUcsQ0FBQ08saUJBQWlCLElBQUlILFNBQVM7b0JBQ3JESSxxQkFBcUIsRUFBRVIsR0FBRyxDQUFDUSxxQkFBcUIsSUFBSUosU0FBUztvQkFDN0RLLG1CQUFtQixFQUFFVCxHQUFHLENBQUNTLG1CQUFtQjtvQkFDNUNDLGVBQWUsRUFBRVYsR0FBRyxDQUFDVSxlQUFlO29CQUNwQ0MsbUJBQW1CLEVBQUVYLEdBQUcsQ0FBQ1csbUJBQW1CLElBQUlQLFNBQVM7b0JBQ3pEUSx1QkFBdUIsRUFBRVosR0FBRyxDQUFDWSx1QkFBdUIsSUFBSVIsU0FBUztvQkFDakViLGdCQUFnQixFQUFFbkIsMkRBQWUsQ0FBQzRCLEdBQUcsQ0FBQ1QsZ0JBQWdCLENBQUNlLFdBQVcsRUFBRSxDQUFpQztvQkFDckdwQixhQUFhLEVBQUVjLEdBQUcsQ0FBQ2QsYUFBYTtvQkFDaEMyQixtQkFBbUIsRUFBRWIsR0FBRyxDQUFDYSxtQkFBbUI7b0JBQzVDQyxNQUFNLEVBQUVkLEdBQUcsQ0FBQ2MsTUFBTTtpQkFDbkI7Z0JBQ0RoQixVQUFVLENBQUNpQixJQUFJLENBQUNkLE9BQU8sQ0FBQzthQUN6QixDQUFDO1lBQ0YsT0FBT3hCLEdBQUcsQ0FBQ3VDLElBQUksQ0FBQ2xCLFVBQVUsQ0FBQztTQUM1QixDQUFDLE9BQU9tQixLQUFLLEVBQUU7WUFDZCxPQUFPeEMsR0FBRyxDQUFDdUMsSUFBSSxDQUFDQyxLQUFLLENBQUM7U0FDdkI7S0FDRjtDQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29sbGFiLy4vcGFnZXMvYXBpL293bi9pdGVtL2l0ZW0udHM/ZTkzYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB3aXRoSXJvblNlc3Npb25BcGlSb3V0ZSB9IGZyb20gJ2lyb24tc2Vzc2lvbi9uZXh0JztcbmltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0JztcbmltcG9ydCB7IHNlc3Npb25PcHRpb25zIH0gZnJvbSAnbGliL2lyb25fc2Vzc2lvbic7XG5pbXBvcnQgcHJpc21hIGZyb20gJ2xpYi9wcmlzbWEnO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgYXMgUHJpc21hQ2F0ZWdvcnksIFZpc2liaWxpdHlMZXZlbCBhcyBQcmlzbWFWaXNpYmlsaXR5TGV2ZWx9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcbmltcG9ydCB7IENhdGVnb3J5LCBJdGVtU2FmZSwgSXRlbVR5cGUsIFZpc2liaWxpdHlMZXZlbCB9IGZyb20gJ2xpYi90eXBlcy9pdGVtJztcblxuZXhwb3J0IGRlZmF1bHQgd2l0aElyb25TZXNzaW9uQXBpUm91dGUoaGFuZGxlLCBzZXNzaW9uT3B0aW9ucylcblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlKHJlcTogTmV4dEFwaVJlcXVlc3QscmVzOiBOZXh0QXBpUmVzcG9uc2Upe1xuICBpZihyZXEubWV0aG9kID09PSAnR0VUJyl7XG4gICAgY29uc29sZS5sb2cocmVxLnF1ZXJ5KVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEuaXRlbS5maW5kTWFueSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgY3JlYXRlZF9ieV9pZDogcmVxLnNlc3Npb24udXNlclNlc3Npb24uaWQsXG4gICAgICAgICAgY2F0ZWdvcnk6IG51bGwsXG4gICAgICAgICAgcGVybWlzc2lvbl9sZXZlbDogUHJpc21hVmlzaWJpbGl0eUxldmVsLnByaXZhdGUsXG4gICAgICAgICAgaXRlbV9wZXJtaXNzaW9uczoge1xuICAgICAgICAgICAgc29tZToge1xuICAgICAgICAgICAgICB1c2VyX2lkOiByZXEuc2Vzc2lvbi51c2VyU2Vzc2lvbi5pZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgIGl0ZW1fdHlwZTogJ2FzYycsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBjb25zdCByZXN1bHRTYWZlOiBJdGVtU2FmZVtdID0gW11cbiAgICAgIHJlc3VsdC5mb3JFYWNoKHJvdz0+IHtcbiAgICAgICAgY29uc3QgaXRlbVJvdzogSXRlbVNhZmUgPSB7XG4gICAgICAgICAgaWQ6IHJvdy5pZCxcbiAgICAgICAgICBuYW1lOiByb3cubmFtZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogcm93LmRlc2NyaXB0aW9uID8/IHVuZGVmaW5lZCxcbiAgICAgICAgICBjYXRlZ29yeTogdW5kZWZpbmVkLFxuICAgICAgICAgIGNhdGVnb3J5X2lkOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXRlbV90eXBlOiBJdGVtVHlwZVtyb3cuaXRlbV90eXBlLnRvVXBwZXJDYXNlKCkgYXMga2V5b2YgdHlwZW9mIEl0ZW1UeXBlXSxcbiAgICAgICAgICBkYXRlX3R6X3NlbnNpdGl2ZTogcm93LmRhdGVfdHpfc2Vuc2l0aXZlID8/IHVuZGVmaW5lZCxcbiAgICAgICAgICBkYXRlX3R6X3NlbnNpdGl2ZV9lbmQ6IHJvdy5kYXRlX3R6X3NlbnNpdGl2ZV9lbmQgPz8gdW5kZWZpbmVkLFxuICAgICAgICAgIHRpbWVfc2Vuc2l0aXZlX2ZsYWc6IHJvdy50aW1lX3NlbnNpdGl2ZV9mbGFnLFxuICAgICAgICAgIGRhdGVfcmFuZ2VfZmxhZzogcm93LmRhdGVfcmFuZ2VfZmxhZyxcbiAgICAgICAgICBkYXRlX3R6X2luc2Vuc2l0aXZlOiByb3cuZGF0ZV90el9pbnNlbnNpdGl2ZSA/PyB1bmRlZmluZWQsXG4gICAgICAgICAgZGF0ZV90el9pbnNlbnNpdGl2ZV9lbmQ6IHJvdy5kYXRlX3R6X2luc2Vuc2l0aXZlX2VuZCA/PyB1bmRlZmluZWQsXG4gICAgICAgICAgcGVybWlzc2lvbl9sZXZlbDogVmlzaWJpbGl0eUxldmVsW3Jvdy5wZXJtaXNzaW9uX2xldmVsLnRvVXBwZXJDYXNlKCkgYXMga2V5b2YgdHlwZW9mIFZpc2liaWxpdHlMZXZlbF0sXG4gICAgICAgICAgY3JlYXRlZF9ieV9pZDogcm93LmNyZWF0ZWRfYnlfaWQsXG4gICAgICAgICAgbGFzdF9tb2RpZmllZF9ieV9pZDogcm93Lmxhc3RfbW9kaWZpZWRfYnlfaWQsXG4gICAgICAgICAgYWN0aXZlOiByb3cuYWN0aXZlXG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0U2FmZS5wdXNoKGl0ZW1Sb3cpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHJlcy5qc29uKHJlc3VsdFNhZmUpXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiByZXMuanNvbihlcnJvcilcbiAgICB9XG4gIH0gXG59Il0sIm5hbWVzIjpbIndpdGhJcm9uU2Vzc2lvbkFwaVJvdXRlIiwic2Vzc2lvbk9wdGlvbnMiLCJwcmlzbWEiLCJWaXNpYmlsaXR5TGV2ZWwiLCJQcmlzbWFWaXNpYmlsaXR5TGV2ZWwiLCJJdGVtVHlwZSIsImhhbmRsZSIsInJlcSIsInJlcyIsIm1ldGhvZCIsImNvbnNvbGUiLCJsb2ciLCJxdWVyeSIsInJlc3VsdCIsIml0ZW0iLCJmaW5kTWFueSIsIndoZXJlIiwiY3JlYXRlZF9ieV9pZCIsInNlc3Npb24iLCJ1c2VyU2Vzc2lvbiIsImlkIiwiY2F0ZWdvcnkiLCJwZXJtaXNzaW9uX2xldmVsIiwicHJpdmF0ZSIsIml0ZW1fcGVybWlzc2lvbnMiLCJzb21lIiwidXNlcl9pZCIsIm9yZGVyQnkiLCJpdGVtX3R5cGUiLCJyZXN1bHRTYWZlIiwiZm9yRWFjaCIsInJvdyIsIml0ZW1Sb3ciLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJ1bmRlZmluZWQiLCJjYXRlZ29yeV9pZCIsInRvVXBwZXJDYXNlIiwiZGF0ZV90el9zZW5zaXRpdmUiLCJkYXRlX3R6X3NlbnNpdGl2ZV9lbmQiLCJ0aW1lX3NlbnNpdGl2ZV9mbGFnIiwiZGF0ZV9yYW5nZV9mbGFnIiwiZGF0ZV90el9pbnNlbnNpdGl2ZSIsImRhdGVfdHpfaW5zZW5zaXRpdmVfZW5kIiwibGFzdF9tb2RpZmllZF9ieV9pZCIsImFjdGl2ZSIsInB1c2giLCJqc29uIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/own/item/item.ts\n");

/***/ }),

/***/ "(api)/./node_modules/iron-session/next/dist/index.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/iron-session/next/dist/index.mjs ***!
  \*******************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"withIronSessionApiRoute\": () => (/* binding */ withIronSessionApiRoute),\n/* harmony export */   \"withIronSessionSsr\": () => (/* binding */ withIronSessionSsr)\n/* harmony export */ });\n/* harmony import */ var iron_session__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iron-session */ \"iron-session\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([iron_session__WEBPACK_IMPORTED_MODULE_0__]);\niron_session__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// next/index.ts\n\n\n// src/getPropertyDescriptorForReqSession.ts\nfunction getPropertyDescriptorForReqSession(session) {\n  return {\n    enumerable: true,\n    get() {\n      return session;\n    },\n    set(value) {\n      const keys = Object.keys(value);\n      const currentKeys = Object.keys(session);\n      currentKeys.forEach((key) => {\n        if (!keys.includes(key)) {\n          delete session[key];\n        }\n      });\n      keys.forEach((key) => {\n        session[key] = value[key];\n      });\n    }\n  };\n}\n\n// next/index.ts\nfunction withIronSessionApiRoute(handler, options) {\n  return async function nextApiHandlerWrappedWithIronSession(req, res) {\n    let sessionOptions;\n    if (options instanceof Function) {\n      sessionOptions = await options(req, res);\n    } else {\n      sessionOptions = options;\n    }\n    const session = await (0,iron_session__WEBPACK_IMPORTED_MODULE_0__.getIronSession)(req, res, sessionOptions);\n    Object.defineProperty(\n      req,\n      \"session\",\n      getPropertyDescriptorForReqSession(session)\n    );\n    return handler(req, res);\n  };\n}\nfunction withIronSessionSsr(handler, options) {\n  return async function nextGetServerSidePropsHandlerWrappedWithIronSession(context) {\n    let sessionOptions;\n    if (options instanceof Function) {\n      sessionOptions = await options(context.req, context.res);\n    } else {\n      sessionOptions = options;\n    }\n    const session = await (0,iron_session__WEBPACK_IMPORTED_MODULE_0__.getIronSession)(\n      context.req,\n      context.res,\n      sessionOptions\n    );\n    Object.defineProperty(\n      context.req,\n      \"session\",\n      getPropertyDescriptorForReqSession(session)\n    );\n    return handler(context);\n  };\n}\n\n//# sourceMappingURL=index.mjs.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvaXJvbi1zZXNzaW9uL25leHQvZGlzdC9pbmRleC5tanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLDBCQUEwQiw0REFBYztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsMEJBQTBCLDREQUFjO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlFO0FBQ0Ysa0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rb2xsYWIvLi9ub2RlX21vZHVsZXMvaXJvbi1zZXNzaW9uL25leHQvZGlzdC9pbmRleC5tanM/YWZhYSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBuZXh0L2luZGV4LnRzXG5pbXBvcnQgeyBnZXRJcm9uU2Vzc2lvbiB9IGZyb20gXCJpcm9uLXNlc3Npb25cIjtcblxuLy8gc3JjL2dldFByb3BlcnR5RGVzY3JpcHRvckZvclJlcVNlc3Npb24udHNcbmZ1bmN0aW9uIGdldFByb3BlcnR5RGVzY3JpcHRvckZvclJlcVNlc3Npb24oc2Vzc2lvbikge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgICBzZXQodmFsdWUpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gICAgICBjb25zdCBjdXJyZW50S2V5cyA9IE9iamVjdC5rZXlzKHNlc3Npb24pO1xuICAgICAgY3VycmVudEtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGlmICgha2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlc3Npb25ba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBzZXNzaW9uW2tleV0gPSB2YWx1ZVtrZXldO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG4vLyBuZXh0L2luZGV4LnRzXG5mdW5jdGlvbiB3aXRoSXJvblNlc3Npb25BcGlSb3V0ZShoYW5kbGVyLCBvcHRpb25zKSB7XG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiBuZXh0QXBpSGFuZGxlcldyYXBwZWRXaXRoSXJvblNlc3Npb24ocmVxLCByZXMpIHtcbiAgICBsZXQgc2Vzc2lvbk9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgc2Vzc2lvbk9wdGlvbnMgPSBhd2FpdCBvcHRpb25zKHJlcSwgcmVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vzc2lvbk9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0SXJvblNlc3Npb24ocmVxLCByZXMsIHNlc3Npb25PcHRpb25zKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gICAgICByZXEsXG4gICAgICBcInNlc3Npb25cIixcbiAgICAgIGdldFByb3BlcnR5RGVzY3JpcHRvckZvclJlcVNlc3Npb24oc2Vzc2lvbilcbiAgICApO1xuICAgIHJldHVybiBoYW5kbGVyKHJlcSwgcmVzKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIHdpdGhJcm9uU2Vzc2lvblNzcihoYW5kbGVyLCBvcHRpb25zKSB7XG4gIHJldHVybiBhc3luYyBmdW5jdGlvbiBuZXh0R2V0U2VydmVyU2lkZVByb3BzSGFuZGxlcldyYXBwZWRXaXRoSXJvblNlc3Npb24oY29udGV4dCkge1xuICAgIGxldCBzZXNzaW9uT3B0aW9ucztcbiAgICBpZiAob3B0aW9ucyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICBzZXNzaW9uT3B0aW9ucyA9IGF3YWl0IG9wdGlvbnMoY29udGV4dC5yZXEsIGNvbnRleHQucmVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vzc2lvbk9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0SXJvblNlc3Npb24oXG4gICAgICBjb250ZXh0LnJlcSxcbiAgICAgIGNvbnRleHQucmVzLFxuICAgICAgc2Vzc2lvbk9wdGlvbnNcbiAgICApO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShcbiAgICAgIGNvbnRleHQucmVxLFxuICAgICAgXCJzZXNzaW9uXCIsXG4gICAgICBnZXRQcm9wZXJ0eURlc2NyaXB0b3JGb3JSZXFTZXNzaW9uKHNlc3Npb24pXG4gICAgKTtcbiAgICByZXR1cm4gaGFuZGxlcihjb250ZXh0KTtcbiAgfTtcbn1cbmV4cG9ydCB7XG4gIHdpdGhJcm9uU2Vzc2lvbkFwaVJvdXRlLFxuICB3aXRoSXJvblNlc3Npb25Tc3Jcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./node_modules/iron-session/next/dist/index.mjs\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/own/item/item.ts"));
module.exports = __webpack_exports__;

})();