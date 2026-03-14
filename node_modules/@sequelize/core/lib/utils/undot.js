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
var undot_exports = {};
__export(undot_exports, {
  acquirePooledObject: () => acquirePooledObject,
  precompileKeys: () => precompileKeys,
  releasePooledObject: () => releasePooledObject,
  setByPathArray: () => setByPathArray,
  tokenizePath: () => tokenizePath,
  transformRowWithPrecompiled: () => transformRowWithPrecompiled
});
module.exports = __toCommonJS(undot_exports);
function tokenizePath(key) {
  const out = [];
  let i = 0;
  const n = key.length;
  let buf = "";
  const flushBuf = () => {
    if (buf.length) {
      out.push(buf);
      buf = "";
    }
  };
  while (i < n) {
    const ch = key.charCodeAt(i);
    if (ch === 46) {
      flushBuf();
      i++;
      continue;
    }
    if (ch === 91) {
      flushBuf();
      i++;
      let num = 0;
      let hasDigit = false;
      let hasClosingBracket = false;
      while (i < n) {
        const c = key.charCodeAt(i);
        if (c >= 48 && c <= 57) {
          hasDigit = true;
          num = num * 10 + (c - 48);
          i++;
          continue;
        }
        if (c === 93) {
          hasClosingBracket = true;
          i++;
          break;
        }
        throw new Error(`Unsupported bracket syntax in key: ${key}`);
      }
      if (!hasClosingBracket) {
        throw new Error(`Unterminated bracket in key: ${key}`);
      }
      if (!hasDigit) {
        throw new Error(`Empty or non-numeric bracket in key: ${key}`);
      }
      out.push(num);
      continue;
    }
    buf += key[i++];
  }
  flushBuf();
  return out;
}
function precompileKeys(keys) {
  const compiled = new Array(keys.length);
  const index = /* @__PURE__ */ new Map();
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const hasDot = k.indexOf(".") >= 0;
    const hasBracket = k.indexOf("[") >= 0;
    const path = hasDot || hasBracket ? tokenizePath(k) : [k];
    compiled[i] = { sourceKey: k, path };
    index.set(k, path);
  }
  return { compiled, index };
}
function setByPathArray(target, path, value) {
  let obj = target;
  const last = path.length - 1;
  for (let i = 0; i < last; i++) {
    const seg = path[i];
    const nextIsIndex = typeof path[i + 1] === "number";
    if (typeof seg === "number") {
      if (!Array.isArray(obj)) {
        obj = [];
      }
      if (obj[seg] == null) {
        obj[seg] = nextIsIndex ? [] : {};
      }
      obj = obj[seg];
    } else {
      let next = obj[seg];
      if (next == null || typeof next !== "object" && !Array.isArray(next)) {
        obj[seg] = nextIsIndex ? [] : {};
        next = obj[seg];
      }
      obj = next;
    }
  }
  const leaf = path[last];
  obj[leaf] = value;
}
function transformRowWithPrecompiled(row, pre, out) {
  const target = out ?? {};
  const { compiled } = pre;
  for (let i = 0; i < compiled.length; i++) {
    const { sourceKey, path } = compiled[i];
    const v = row[sourceKey];
    if (v !== void 0) {
      setByPathArray(target, path, v);
    }
  }
  return target;
}
function acquirePooledObject(pool) {
  const obj = pool.pop();
  if (!obj) {
    return {};
  }
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    delete obj[keys[i]];
  }
  return obj;
}
function releasePooledObject(pool, obj) {
  pool.push(obj);
}
//# sourceMappingURL=undot.js.map
