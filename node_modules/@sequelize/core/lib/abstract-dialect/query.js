"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_exports = {};
__export(query_exports, {
  AbstractQuery: () => AbstractQuery
});
module.exports = __toCommonJS(query_exports);
var import_isEmpty = __toESM(require("lodash/isEmpty"));
var import_node_crypto = require("node:crypto");
var import_node_util = __toESM(require("node:util"));
var import_enums = require("../enums");
var deprecations = __toESM(require("../utils/deprecations"));
var import_undot = require("../utils/undot");
var import_data_types = require("./data-types");
const uniqueKeyAttributesCache = /* @__PURE__ */ new WeakMap();
const columnAttributeNameCache = /* @__PURE__ */ new WeakMap();
function getAttributeNameFromColumn(model, columnOrAttribute) {
  const definition = model.modelDefinition;
  if (definition.attributes.has(columnOrAttribute)) {
    return columnOrAttribute;
  }
  let cache = columnAttributeNameCache.get(model);
  if (!cache) {
    cache = /* @__PURE__ */ new Map();
    for (const attribute of definition.attributes.values()) {
      cache.set(attribute.columnName, attribute.attributeName);
    }
    columnAttributeNameCache.set(model, cache);
  }
  return cache.get(columnOrAttribute) ?? columnOrAttribute;
}
function remapRowFields(row, fieldMap) {
  const output = { ...row };
  const fields = Object.keys(fieldMap);
  for (let index = 0; index < fields.length; ++index) {
    const field = fields[index];
    const name = fieldMap[field];
    if (field in output && name !== field) {
      output[name] = output[field];
      delete output[field];
    }
  }
  return output;
}
function isIterable(value) {
  return value != null && typeof value[Symbol.iterator] === "function";
}
function extractAssociation(association) {
  if (association && typeof association === "object") {
    return association;
  }
  return void 0;
}
function buildHashAttributeRowKeys(prefixId, primaryKeyAttributes, uniqueKeyAttributes) {
  const attributeNames = primaryKeyAttributes.length > 0 ? primaryKeyAttributes : uniqueKeyAttributes;
  if (attributeNames.length === 0) {
    return [];
  }
  const rowKeyPrefix = prefixId ? `${prefixId}.` : "";
  return attributeNames.map((attributeName) => `${rowKeyPrefix}${attributeName}`);
}
function computeHashesForMeta(meta, row, includeMap, prefixMeta, topHashEntry, prefixHashCache) {
  if (meta.prefixLength === 0) {
    return topHashEntry;
  }
  return getHashesForPrefix(
    meta.prefixId,
    row,
    includeMap,
    prefixMeta,
    topHashEntry.itemHash,
    prefixHashCache
  );
}
function attachToParent(meta, parentHash, resultMap, childValues) {
  if (!parentHash) {
    return;
  }
  const parentContainer = resultMap[parentHash];
  if (!parentContainer) {
    return;
  }
  const association = extractAssociation(meta.include?.association);
  const associationKey = meta.lastKeySegment;
  if (!association || !association.isMultiAssociation) {
    parentContainer[associationKey] = childValues;
    return;
  }
  let associationValues = parentContainer[associationKey];
  if (!Array.isArray(associationValues)) {
    const newAssociationValues = [];
    parentContainer[associationKey] = newAssociationValues;
    associationValues = newAssociationValues;
  }
  associationValues.push(childValues);
}
function acquireValuesObject(pool) {
  const reusable = pool.pop();
  if (!reusable) {
    return {};
  }
  const keys = Object.keys(reusable);
  for (let i = 0; i < keys.length; i++) {
    delete reusable[keys[i]];
  }
  return reusable;
}
function releaseValuesObject(pool, obj) {
  pool.push(obj);
}
function attachExistingSegment(previousMeta, row, includeMap, prefixMeta, prefixHashCache, currentValues, resultMap, freeList, topHashEntry) {
  const hashes = computeHashesForMeta(
    previousMeta,
    row,
    includeMap,
    prefixMeta,
    topHashEntry,
    prefixHashCache
  );
  const nextValues = acquireValuesObject(freeList);
  if (hashes.itemHash === topHashEntry.itemHash) {
    if (!resultMap[topHashEntry.itemHash]) {
      resultMap[topHashEntry.itemHash] = currentValues;
      return { nextValues, topExists: false };
    }
    releaseValuesObject(freeList, currentValues);
    return { nextValues, topExists: true };
  }
  if (!resultMap[hashes.itemHash]) {
    resultMap[hashes.itemHash] = currentValues;
    attachToParent(previousMeta, hashes.parentHash, resultMap, currentValues);
  } else {
    releaseValuesObject(freeList, currentValues);
  }
  return { nextValues, topExists: false };
}
function ensureNestedContainer(topValues, meta) {
  if (meta.prefixLength === 0) {
    return topValues;
  }
  let current = topValues;
  const { prefixParts, prefixLength } = meta;
  for (let index = 0; index < prefixLength; ++index) {
    const part = prefixParts[index];
    if (index === prefixLength - 1) {
      if (typeof current[part] !== "object" || current[part] == null) {
        current[part] = {};
      }
      return current[part];
    }
    if (typeof current[part] !== "object" || current[part] == null) {
      current[part] = {};
    }
    current = current[part];
  }
  return current;
}
function finalizeExistingRow(previousMeta, row, includeMap, prefixMeta, prefixHashCache, currentValues, resultMap, currentTopExists, freeList, topHashEntry) {
  const hashes = computeHashesForMeta(
    previousMeta,
    row,
    includeMap,
    prefixMeta,
    topHashEntry,
    prefixHashCache
  );
  if (hashes.itemHash === topHashEntry.itemHash) {
    if (!resultMap[topHashEntry.itemHash]) {
      resultMap[topHashEntry.itemHash] = currentValues;
      return currentTopExists;
    }
    releaseValuesObject(freeList, currentValues);
    return true;
  }
  if (!resultMap[hashes.itemHash]) {
    resultMap[hashes.itemHash] = currentValues;
    attachToParent(previousMeta, hashes.parentHash, resultMap, currentValues);
  } else {
    releaseValuesObject(freeList, currentValues);
  }
  return currentTopExists;
}
function resolveIncludeForKey(rawKey, prefixParts, rootInclude, includeMap) {
  if (prefixParts.length === 0) {
    includeMap[rawKey] = rootInclude;
    includeMap[""] = rootInclude;
    return rootInclude;
  }
  let currentInclude = rootInclude;
  let accumulatedPath;
  for (let i = 0; i < prefixParts.length; i++) {
    const piece = prefixParts[i];
    currentInclude = currentInclude?.includeMap?.[piece];
    if (!currentInclude) {
      return void 0;
    }
    accumulatedPath = accumulatedPath ? `${accumulatedPath}.${piece}` : piece;
    includeMap[accumulatedPath] = currentInclude;
  }
  includeMap[rawKey] = currentInclude;
  return currentInclude;
}
function getUniqueKeyAttributes(model) {
  const cached = uniqueKeyAttributesCache.get(model);
  if (cached) {
    return cached;
  }
  const uniqueKeys = model.uniqueKeys ?? {};
  const uniqueKeyAttributes = [];
  if (!(0, import_isEmpty.default)(uniqueKeys)) {
    const [firstUniqueKeyName] = Object.keys(uniqueKeys);
    const uniqueKey = firstUniqueKeyName ? uniqueKeys[firstUniqueKeyName] : void 0;
    const fields = uniqueKey?.fields ?? [];
    for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
      const field = fields[fieldIndex];
      if (typeof field !== "string") {
        continue;
      }
      uniqueKeyAttributes.push(getAttributeNameFromColumn(model, field));
    }
  }
  uniqueKeyAttributesCache.set(model, uniqueKeyAttributes);
  return uniqueKeyAttributes;
}
function sortByDepth(inputKeys) {
  return inputKeys.sort((a, b) => a.split(".").length - b.split(".").length);
}
function stringify(obj) {
  return obj instanceof Buffer ? obj.toString("hex") : obj?.toString() ?? "";
}
function getHash(model, row) {
  const strings = [];
  const primaryKeyAttributes = model.modelDefinition.primaryKeysAttributeNames;
  if (primaryKeyAttributes.size > 0) {
    for (const attributeName of primaryKeyAttributes) {
      strings.push(stringify(row[attributeName]));
    }
  } else {
    const uniqueKeyAttributes = getUniqueKeyAttributes(model);
    for (let i = 0; i < uniqueKeyAttributes.length; i++) {
      const attributeName = uniqueKeyAttributes[i];
      strings.push(stringify(row[attributeName]));
    }
  }
  if ((0, import_isEmpty.default)(strings) && !(0, import_isEmpty.default)(model.getIndexes())) {
    for (let i = 0; i < model.getIndexes().length; i++) {
      const index = model.getIndexes()[i];
      if (!index.unique || !index.fields) {
        continue;
      }
      for (let j = 0; j < index.fields.length; j++) {
        const field = index.fields[j];
        if (typeof field !== "string") {
          continue;
        }
        const attributeName = getAttributeNameFromColumn(model, field);
        strings.push(stringify(row[attributeName]));
      }
      break;
    }
  }
  return strings.join("");
}
function getHashesForPrefix(prefix, currentRow, currentIncludeMap, currentPrefixMeta, currentTopHash, prefixHashCache) {
  const cache = prefixHashCache ?? /* @__PURE__ */ new Map();
  if (!cache.has("")) {
    cache.set("", { itemHash: currentTopHash, parentHash: null });
  }
  if (prefix === "") {
    return cache.get("");
  }
  const cached = cache.get(prefix);
  if (cached) {
    return cached;
  }
  const prefixInfo = currentPrefixMeta.get(prefix);
  const include = currentIncludeMap[prefix] ?? prefixInfo?.include;
  if (!include?.model) {
    return cache.get("");
  }
  const hashParts = [prefix];
  let hashAttributeRowKeys = prefixInfo?.hashAttributeRowKeys ?? [];
  if (hashAttributeRowKeys.length === 0) {
    const primaryKeyAttributes = prefixInfo?.primaryKeyAttributes?.length ? prefixInfo.primaryKeyAttributes : [...include.model.modelDefinition.primaryKeysAttributeNames.values()];
    let attributesToHash = primaryKeyAttributes;
    if (attributesToHash.length === 0) {
      const uniqueKeyAttributes = prefixInfo?.uniqueKeyAttributes?.length ? prefixInfo.uniqueKeyAttributes : getUniqueKeyAttributes(include.model);
      attributesToHash = uniqueKeyAttributes;
    }
    if (attributesToHash.length > 0) {
      const rowKeyPrefix = prefix ? `${prefix}.` : "";
      hashAttributeRowKeys = attributesToHash.map(
        (attributeName) => `${rowKeyPrefix}${attributeName}`
      );
      if (prefixInfo) {
        prefixInfo.hashAttributeRowKeys = hashAttributeRowKeys;
      }
    }
  }
  if (hashAttributeRowKeys.length > 0) {
    for (let k = 0; k < hashAttributeRowKeys.length; k++) {
      const attributeKey = hashAttributeRowKeys[k];
      hashParts.push(stringify(currentRow[attributeKey]));
    }
  }
  const parentPrefix = prefixInfo?.parentPrefixId ?? (prefix.includes(".") ? prefix.slice(0, prefix.lastIndexOf(".")) : "");
  const parentHashes = getHashesForPrefix(
    parentPrefix,
    currentRow,
    currentIncludeMap,
    currentPrefixMeta,
    currentTopHash,
    cache
  );
  const parentHashValue = parentHashes.itemHash;
  const hash = hashParts.join("");
  const result = {
    itemHash: parentHashValue + hash,
    parentHash: parentHashValue
  };
  cache.set(prefix, result);
  return result;
}
class AbstractQuery {
  uuid;
  connection;
  instance;
  model;
  sequelize;
  options;
  constructor(connection, sequelize, options) {
    this.uuid = (0, import_node_crypto.randomUUID)();
    this.connection = connection;
    this.sequelize = sequelize;
    const mergedOptions = {
      plain: false,
      raw: false,
      logging: console.debug,
      ...options
    };
    this.instance = mergedOptions.instance;
    this.model = mergedOptions.model;
    this.options = mergedOptions;
    this.checkLoggingOption();
    if (mergedOptions.rawErrors) {
      this.formatError = AbstractQuery.prototype.formatError;
    }
  }
  async logWarnings(results) {
    const warningResultsRaw = await this.run("SHOW WARNINGS");
    const warningRows = Array.isArray(warningResultsRaw) ? warningResultsRaw : [];
    const warningMessage = `${this.sequelize.dialect.name} warnings (${this.connection.uuid || "default"}): `;
    const messages = [];
    for (const warningRow of warningRows) {
      if (!isIterable(warningRow)) {
        continue;
      }
      for (const warningResult of warningRow) {
        if (warningResult && typeof warningResult === "object" && Object.hasOwn(warningResult, "Message") && typeof warningResult.Message === "string") {
          messages.push(warningResult.Message);
          continue;
        }
        const keysFunction = warningResult?.keys;
        if (!keysFunction) {
          continue;
        }
        const iterator = keysFunction.call(warningResult);
        if (!isIterable(iterator)) {
          continue;
        }
        const record = warningResult;
        for (const objectKey of iterator) {
          messages.push([objectKey, record[objectKey]].join(": "));
        }
      }
    }
    this.sequelize.log(warningMessage + messages.join("; "), this.options);
    return results;
  }
  formatError(error, errStack) {
    if (errStack) {
      error.stack = errStack;
    }
    return error;
  }
  async run(_sql, _parameters, _options) {
    throw new Error("The run method wasn't overwritten!");
  }
  checkLoggingOption() {
    if (this.options.logging === true) {
      deprecations.noTrueLogging();
      this.options.logging = console.debug;
    }
  }
  getInsertIdField() {
    return "insertId";
  }
  getUniqueConstraintErrorMessage(field) {
    if (!field) {
      return "Must be unique";
    }
    const message = `${field} must be unique`;
    if (!this.model) {
      return message;
    }
    const model = this.model;
    for (let i = 0; i < model.getIndexes().length; i++) {
      const index = model.getIndexes()[i];
      if (!index.unique || !index.fields) {
        continue;
      }
      const normalizedField = field.replaceAll('"', "");
      const matches = index.fields.some(
        (indexField) => typeof indexField === "string" && indexField === normalizedField
      );
      if (matches && index.msg) {
        return index.msg;
      }
    }
    return message;
  }
  isRawQuery() {
    return this.options.type === import_enums.QueryTypes.RAW;
  }
  isUpsertQuery() {
    return this.options.type === import_enums.QueryTypes.UPSERT;
  }
  isInsertQuery(results, metaData) {
    if (this.options.type === import_enums.QueryTypes.INSERT) {
      return true;
    }
    const sql = this.sql?.toLowerCase() ?? "";
    let result = true;
    result &&= sql.startsWith("insert into");
    result &&= !results || Object.hasOwn(results, this.getInsertIdField());
    result &&= !metaData || Object.hasOwn(metaData, this.getInsertIdField());
    return result;
  }
  handleInsertQuery(results, metaData) {
    if (!this.instance) {
      return;
    }
    const autoIncrementAttribute = this.model?.modelDefinition?.autoIncrementAttributeName;
    if (!autoIncrementAttribute) {
      return;
    }
    const id = results?.[this.getInsertIdField()] ?? metaData?.[this.getInsertIdField()] ?? null;
    const instanceRecord = this.instance;
    instanceRecord[autoIncrementAttribute] = id;
  }
  isShowIndexesQuery() {
    return this.options.type === import_enums.QueryTypes.SHOWINDEXES;
  }
  isShowConstraintsQuery() {
    return this.options.type === import_enums.QueryTypes.SHOWCONSTRAINTS;
  }
  isDescribeQuery() {
    return this.options.type === import_enums.QueryTypes.DESCRIBE;
  }
  isSelectQuery() {
    return this.options.type === import_enums.QueryTypes.SELECT;
  }
  isBulkUpdateQuery() {
    return this.options.type === import_enums.QueryTypes.BULKUPDATE;
  }
  isDeleteQuery() {
    return this.options.type === import_enums.QueryTypes.DELETE;
  }
  isUpdateQuery() {
    return this.options.type === import_enums.QueryTypes.UPDATE;
  }
  /**
   * Post-processes a SELECT result set according to the query options:
   * - Remaps field names when `fieldMap` is provided.
   * - Returns raw nested objects when `raw` and `nest` are set.
   * - Groups JOINed rows into nested include graphs and builds model instances otherwise.
   *
   * @param results - The raw rows returned by the driver.
   * @returns Raw objects or built model instances depending on `options`.
   */
  handleSelectQuery(results) {
    let processedResults = results;
    let result = null;
    if (this.options.fieldMap && typeof this.options.fieldMap === "object") {
      processedResults = processedResults.map(
        (row) => remapRowFields(row, this.options.fieldMap)
      );
    }
    if (this.options.raw) {
      let precompiled;
      const rawRows = processedResults.map((row) => {
        if (!this.options.nest) {
          return row;
        }
        if (!precompiled) {
          precompiled = (0, import_undot.precompileKeys)(Object.keys(row));
        }
        const target = {};
        (0, import_undot.transformRowWithPrecompiled)(row, precompiled, target);
        const rowKeys = Object.keys(row);
        for (let i = 0; i < rowKeys.length; ++i) {
          const k = rowKeys[i];
          if (!precompiled.index.has(k)) {
            const path = (0, import_undot.tokenizePath)(k);
            const v = row[k];
            if (v !== void 0) {
              (0, import_undot.setByPathArray)(target, path, v);
            }
            precompiled.index.set(k, path);
            precompiled.compiled.push({ sourceKey: k, path });
          }
        }
        return target;
      });
      result = rawRows;
    } else if (this.options.hasJoin === true && this.model) {
      const model = this.model;
      const includeMap = this.options.includeMap;
      const joinedResults = AbstractQuery._groupJoinData(
        processedResults,
        {
          model,
          ...includeMap !== void 0 && { includeMap },
          ...this.options.includeNames !== void 0 && {
            includeNames: this.options.includeNames
          }
        },
        {
          checkExisting: Boolean(this.options.hasMultiAssociation)
        }
      );
      const parsedRows = this._parseDataArrayByType(joinedResults, model, includeMap);
      const buildOptions = {
        isNewRecord: false,
        includeNames: this.options.includeNames,
        includeMap,
        includeValidated: true,
        attributes: this.options.originalAttributes ?? this.options.attributes,
        raw: true,
        comesFromDatabase: true
      };
      const includeOption = typeof this.options.include === "boolean" ? void 0 : this.options.include;
      if (includeOption !== void 0) {
        buildOptions.include = includeOption;
      }
      result = model.bulkBuild(
        parsedRows,
        buildOptions
      );
    } else if (this.model) {
      const model = this.model;
      const parsedRows = this._parseDataArrayByType(
        processedResults,
        model,
        this.options.includeMap
      );
      const buildOptions = {
        isNewRecord: false,
        raw: true,
        comesFromDatabase: true,
        attributes: this.options.originalAttributes ?? this.options.attributes
      };
      result = model.bulkBuild(
        parsedRows,
        buildOptions
      );
    }
    if (result == null) {
      result = processedResults;
    }
    if (this.options.plain && Array.isArray(result)) {
      return result.length === 0 ? null : result[0];
    }
    return result;
  }
  /**
   * Applies attribute-type parsing to an array of value objects.
   *
   * @param valueArrays - Array of objects to parse in-place.
   * @param model - The model providing attribute types for parsing.
   * @param includeMap - Include lookup map for nested parsing.
   * @returns The same array instance after parsing.
   */
  _parseDataArrayByType(valueArrays, model, includeMap) {
    for (let index = 0; index < valueArrays.length; ++index) {
      const values = valueArrays[index];
      this._parseDataByType(values, model, includeMap);
    }
    return valueArrays;
  }
  /**
   * Applies attribute-type parsing to a single object. Descends into includes when present.
   *
   * @param values - The object to mutate with parsed values.
   * @param model - The model providing attribute types for parsing.
   * @param includeMap - Include lookup map for nested parsing.
   * @returns The mutated `values` object.
   */
  _parseDataByType(values, model, includeMap) {
    const keys = Object.keys(values);
    for (let index = 0; index < keys.length; ++index) {
      const key = keys[index];
      const nestedInclude = includeMap?.[key];
      if (nestedInclude) {
        const child = values[key];
        if (Array.isArray(child)) {
          values[key] = this._parseDataArrayByType(
            child,
            nestedInclude.model,
            nestedInclude.includeMap
          );
        } else if (child && typeof child === "object") {
          values[key] = this._parseDataByType(
            child,
            nestedInclude.model,
            nestedInclude.includeMap
          );
        }
        continue;
      }
      const attribute = model?.modelDefinition?.attributes.get(key);
      values[key] = this._parseDatabaseValue(values[key], attribute?.type);
    }
    return values;
  }
  /**
   * Parses a raw database value using the attribute's data-type parser when available.
   *
   * @param value - The raw value to parse.
   * @param attributeType - The normalized data type to parse with.
   * @returns The parsed value, or the original value if no parser applies.
   */
  _parseDatabaseValue(value, attributeType) {
    if (value == null) {
      return value;
    }
    if (!attributeType || !(attributeType instanceof import_data_types.AbstractDataType)) {
      return value;
    }
    return attributeType.parseDatabaseValue(value);
  }
  isShowOrDescribeQuery() {
    const sql = this.sql?.toLowerCase() ?? "";
    return sql.startsWith("show") || sql.startsWith("describe");
  }
  isCallQuery() {
    return (this.sql?.toLowerCase() ?? "").startsWith("call");
  }
  /**
   * Logs a SQL query with optional parameters and returns a function to log completion.
   * When benchmarking is enabled, the completion logger emits timing information.
   *
   * @param sql - The SQL string to log.
   * @param debugContext - A function receiving debug messages.
   * @param parameters - Optional bound parameters to display when enabled.
   * @returns A callback to be invoked after query execution to finalize logging.
   */
  _logQuery(sql, debugContext, parameters) {
    const { connection, options } = this;
    const benchmark = this.sequelize.options.benchmark || options.benchmark;
    const logQueryParameters = this.sequelize.options.logQueryParameters || options.logQueryParameters;
    const startTime = Date.now();
    let logParameter = "";
    if (logQueryParameters && parameters) {
      const delimiter = sql.endsWith(";") ? "" : ";";
      logParameter = `${delimiter} with parameters ${import_node_util.default.inspect(parameters)}`;
    }
    const fmt = `(${connection.uuid || "default"}): ${sql}${logParameter}`;
    const queryLabel = options.queryLabel ? `${options.queryLabel}
` : "";
    const msg = `${queryLabel}Executing ${fmt}`;
    debugContext(msg);
    if (!benchmark) {
      this.sequelize.log(`${queryLabel}Executing ${fmt}`, options);
    }
    return () => {
      const afterMsg = `${queryLabel}Executed ${fmt}`;
      debugContext(afterMsg);
      if (benchmark) {
        this.sequelize.log(afterMsg, Date.now() - startTime, options);
      }
    };
  }
  /**
   * Groups a flat array of JOINed rows into nested objects according to include definitions.
   *
   * Algorithm overview:
   * - Sorts row keys by depth to build prefix metadata once on the first row.
   * - For each row, computes stable identity hashes for each include prefix
   *   using PK/unique-key values to de-duplicate repeated JOIN combinations.
   * - Uses a global `resultMap` keyed by hash to re-use previously materialized
   *   containers and attach children in O(1) time.
   * - In non-dedup mode, directly builds nested objects for each row without hashing.
   *
   * Complexity:
   * - First row metadata setup: O(K log K) for K keys due to depth sort.
   * - Each subsequent row: O(K) for value assignment and at most O(depth) hash lookups.
   *
   * @param rows - Raw rows as returned by the driver with dotted keys.
   * @param includeOptions - The root include options and model information.
   * @param options - Controls whether de-duplication is applied.
   * @returns An array of nested objects ready for model-building or raw return.
   */
  static _groupJoinData(rows, includeOptions, options) {
    if (rows.length === 0) {
      return [];
    }
    const rowsLength = rows.length;
    let keys = [];
    let keyLength = 0;
    let keyMeta = [];
    let prefixMeta = /* @__PURE__ */ new Map();
    const checkExisting = options.checkExisting;
    const results = checkExisting ? [] : new Array(rowsLength);
    const resultMap = {};
    const includeMap = {};
    for (let rowIndex = 0; rowIndex < rowsLength; ++rowIndex) {
      const row = rows[rowIndex];
      const freeList = [];
      let prefixHashCache;
      let topHashEntry;
      let topHash = "";
      if (rowIndex === 0) {
        keys = sortByDepth(Object.keys(row));
        keyLength = keys.length;
        keyMeta = [];
        prefixMeta = /* @__PURE__ */ new Map();
        const prefixPartsCache = /* @__PURE__ */ new Map();
        for (let i = 0; i < keys.length; i++) {
          const rawKey = keys[i];
          const lastDotIndex = rawKey.lastIndexOf(".");
          const prefixId = lastDotIndex === -1 ? "" : rawKey.slice(0, lastDotIndex);
          let prefixParts = prefixPartsCache.get(prefixId);
          if (!prefixParts) {
            prefixParts = prefixId ? prefixId.split(".") : [];
            prefixPartsCache.set(prefixId, prefixParts);
          }
          const prefixLength = prefixParts.length;
          const attribute = lastDotIndex === -1 ? rawKey : rawKey.slice(lastDotIndex + 1);
          const lastKeySegment = prefixLength ? prefixParts[prefixLength - 1] : "";
          if (!Object.hasOwn(includeMap, rawKey)) {
            resolveIncludeForKey(rawKey, prefixParts, includeOptions, includeMap);
          }
          const includeForKey = includeMap[rawKey];
          const modelForKey = includeForKey?.model;
          const parentPrefixId = prefixLength === 0 ? "" : prefixId.slice(0, Math.max(0, prefixId.lastIndexOf("."))) || "";
          const primaryKeyAttributes = modelForKey?.primaryKeyAttributes ?? [];
          const hasUniqueKeys = modelForKey ? !(0, import_isEmpty.default)(modelForKey.uniqueKeys) : false;
          const uniqueKeyAttributes = hasUniqueKeys && modelForKey ? getUniqueKeyAttributes(modelForKey) : [];
          const hashAttributeRowKeys = buildHashAttributeRowKeys(
            prefixId,
            primaryKeyAttributes,
            uniqueKeyAttributes
          );
          const metaEntry = {
            key: rawKey,
            attribute,
            prefixParts,
            prefixLength,
            prefixId,
            lastKeySegment,
            include: includeForKey,
            parentPrefixId,
            primaryKeyAttributes,
            uniqueKeyAttributes,
            hashAttributeRowKeys
          };
          keyMeta.push(metaEntry);
          if (!prefixMeta.has(prefixId)) {
            prefixMeta.set(prefixId, metaEntry);
          }
        }
      }
      let topExistsForRow = false;
      if (checkExisting) {
        topHash = getHash(includeOptions.model, row);
        prefixHashCache = /* @__PURE__ */ new Map();
        const rootEntry = { itemHash: topHash, parentHash: null };
        prefixHashCache.set("", rootEntry);
        topHashEntry = rootEntry;
      }
      let currentValues = checkExisting ? acquireValuesObject(freeList) : {};
      const topValues = currentValues;
      let previousMeta;
      for (let keyIndex = 0; keyIndex < keyLength; ++keyIndex) {
        const meta = keyMeta[keyIndex];
        const key = keys[keyIndex];
        if (previousMeta && previousMeta.prefixId !== meta.prefixId) {
          if (checkExisting) {
            const segmentResult = attachExistingSegment(
              previousMeta,
              row,
              includeMap,
              prefixMeta,
              prefixHashCache,
              currentValues,
              resultMap,
              freeList,
              topHashEntry
            );
            currentValues = segmentResult.nextValues;
            topExistsForRow ||= segmentResult.topExists;
          } else {
            currentValues = ensureNestedContainer(topValues, meta);
          }
        }
        currentValues[meta.attribute] = row[key];
        previousMeta = meta;
      }
      if (checkExisting && previousMeta) {
        const finalTopExists = finalizeExistingRow(
          previousMeta,
          row,
          includeMap,
          prefixMeta,
          prefixHashCache,
          currentValues,
          resultMap,
          topExistsForRow,
          freeList,
          topHashEntry
        );
        if (!finalTopExists) {
          results.push(topValues);
        }
      } else if (!checkExisting) {
        results[rowIndex] = topValues;
      }
    }
    return results;
  }
}
//# sourceMappingURL=query.js.map
