"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var operators_exports = {};
__export(operators_exports, {
  Op: () => Op
});
module.exports = __toCommonJS(operators_exports);
const Op = {
  eq: /* @__PURE__ */ Symbol.for("eq"),
  ne: /* @__PURE__ */ Symbol.for("ne"),
  gte: /* @__PURE__ */ Symbol.for("gte"),
  gt: /* @__PURE__ */ Symbol.for("gt"),
  lte: /* @__PURE__ */ Symbol.for("lte"),
  lt: /* @__PURE__ */ Symbol.for("lt"),
  not: /* @__PURE__ */ Symbol.for("not"),
  is: /* @__PURE__ */ Symbol.for("is"),
  isNot: /* @__PURE__ */ Symbol.for("isNot"),
  in: /* @__PURE__ */ Symbol.for("in"),
  notIn: /* @__PURE__ */ Symbol.for("notIn"),
  like: /* @__PURE__ */ Symbol.for("like"),
  notLike: /* @__PURE__ */ Symbol.for("notLike"),
  iLike: /* @__PURE__ */ Symbol.for("iLike"),
  notILike: /* @__PURE__ */ Symbol.for("notILike"),
  startsWith: /* @__PURE__ */ Symbol.for("startsWith"),
  notStartsWith: /* @__PURE__ */ Symbol.for("notStartsWith"),
  endsWith: /* @__PURE__ */ Symbol.for("endsWith"),
  notEndsWith: /* @__PURE__ */ Symbol.for("notEndsWith"),
  substring: /* @__PURE__ */ Symbol.for("substring"),
  notSubstring: /* @__PURE__ */ Symbol.for("notSubstring"),
  regexp: /* @__PURE__ */ Symbol.for("regexp"),
  notRegexp: /* @__PURE__ */ Symbol.for("notRegexp"),
  iRegexp: /* @__PURE__ */ Symbol.for("iRegexp"),
  notIRegexp: /* @__PURE__ */ Symbol.for("notIRegexp"),
  between: /* @__PURE__ */ Symbol.for("between"),
  notBetween: /* @__PURE__ */ Symbol.for("notBetween"),
  overlap: /* @__PURE__ */ Symbol.for("overlap"),
  contains: /* @__PURE__ */ Symbol.for("contains"),
  contained: /* @__PURE__ */ Symbol.for("contained"),
  adjacent: /* @__PURE__ */ Symbol.for("adjacent"),
  strictLeft: /* @__PURE__ */ Symbol.for("strictLeft"),
  strictRight: /* @__PURE__ */ Symbol.for("strictRight"),
  noExtendRight: /* @__PURE__ */ Symbol.for("noExtendRight"),
  noExtendLeft: /* @__PURE__ */ Symbol.for("noExtendLeft"),
  and: /* @__PURE__ */ Symbol.for("and"),
  or: /* @__PURE__ */ Symbol.for("or"),
  any: /* @__PURE__ */ Symbol.for("any"),
  all: /* @__PURE__ */ Symbol.for("all"),
  values: /* @__PURE__ */ Symbol.for("values"),
  col: /* @__PURE__ */ Symbol.for("col"),
  match: /* @__PURE__ */ Symbol.for("match"),
  anyKeyExists: /* @__PURE__ */ Symbol.for("anyKeyExists"),
  allKeysExist: /* @__PURE__ */ Symbol.for("allKeysExist")
};
//# sourceMappingURL=operators.js.map
