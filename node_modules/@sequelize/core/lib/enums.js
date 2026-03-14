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
var enums_exports = {};
__export(enums_exports, {
  IndexHints: () => IndexHints,
  ParameterStyle: () => ParameterStyle,
  QueryTypes: () => QueryTypes,
  TableHints: () => TableHints
});
module.exports = __toCommonJS(enums_exports);
var IndexHints = /* @__PURE__ */ ((IndexHints2) => {
  IndexHints2["USE"] = "USE";
  IndexHints2["FORCE"] = "FORCE";
  IndexHints2["IGNORE"] = "IGNORE";
  return IndexHints2;
})(IndexHints || {});
var ParameterStyle = /* @__PURE__ */ ((ParameterStyle2) => {
  ParameterStyle2["BIND"] = "BIND";
  ParameterStyle2["REPLACEMENT"] = "REPLACEMENT";
  return ParameterStyle2;
})(ParameterStyle || {});
var QueryTypes = /* @__PURE__ */ ((QueryTypes2) => {
  QueryTypes2["SELECT"] = "SELECT";
  QueryTypes2["INSERT"] = "INSERT";
  QueryTypes2["UPDATE"] = "UPDATE";
  QueryTypes2["BULKUPDATE"] = "BULKUPDATE";
  QueryTypes2["DELETE"] = "DELETE";
  QueryTypes2["UPSERT"] = "UPSERT";
  QueryTypes2["SHOWINDEXES"] = "SHOWINDEXES";
  QueryTypes2["DESCRIBE"] = "DESCRIBE";
  QueryTypes2["RAW"] = "RAW";
  QueryTypes2["SHOWCONSTRAINTS"] = "SHOWCONSTRAINTS";
  return QueryTypes2;
})(QueryTypes || {});
var TableHints = /* @__PURE__ */ ((TableHints2) => {
  TableHints2["NOLOCK"] = "NOLOCK";
  TableHints2["READUNCOMMITTED"] = "READUNCOMMITTED";
  TableHints2["UPDLOCK"] = "UPDLOCK";
  TableHints2["REPEATABLEREAD"] = "REPEATABLEREAD";
  TableHints2["SERIALIZABLE"] = "SERIALIZABLE";
  TableHints2["READCOMMITTED"] = "READCOMMITTED";
  TableHints2["TABLOCK"] = "TABLOCK";
  TableHints2["TABLOCKX"] = "TABLOCKX";
  TableHints2["PAGLOCK"] = "PAGLOCK";
  TableHints2["ROWLOCK"] = "ROWLOCK";
  TableHints2["NOWAIT"] = "NOWAIT";
  TableHints2["READPAST"] = "READPAST";
  TableHints2["XLOCK"] = "XLOCK";
  TableHints2["SNAPSHOT"] = "SNAPSHOT";
  TableHints2["NOEXPAND"] = "NOEXPAND";
  return TableHints2;
})(TableHints || {});
//# sourceMappingURL=enums.js.map
