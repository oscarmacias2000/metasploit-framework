import { QueryTypes } from '../enums';
import type { IncludeOptions, Model, ModelStatic } from '../model';
import type { Sequelize } from '../sequelize';
import type { AbstractConnection } from './connection-manager';
import type { NormalizedDataType } from './data-types';
/**
 * Include options extended with pre-resolved model and a fast lookup map for child includes.
 */
interface IncludeOptionsWithMap extends IncludeOptions {
    /**
     * Model associated to this include (present after include resolution).
     */
    model?: ModelStatic;
    /**
     * Map of child include name -> include options for constant-time lookups.
     */
    includeMap?: Record<string, IncludeOptionsWithMap | undefined>;
}
/**
 * Lookup table from dotted include path (e.g., "posts.comments") to the corresponding include options.
 */
type IncludeMap = Record<string, IncludeOptionsWithMap | undefined>;
/**
 * The root include options used when grouping JOINed rows. Root must always have a model.
 */
type RootIncludeOptions = IncludeOptionsWithMap & {
    /** The root model for the query. */
    model: ModelStatic;
    /**
     * List of include names in resolution order; used by model building.
     */
    includeNames?: readonly string[];
};
export interface AbstractQueryGroupJoinDataOptions {
    /**
     * Whether to de-duplicate rows by hashing PK/unique keys when grouping JOIN results.
     * If `false`, rows are nested directly without deduplication (faster for no-join queries).
     */
    checkExisting: boolean;
}
export interface AbstractQueryOptions {
    /** The instance being operated on (e.g., for INSERT/UPDATE). */
    instance?: Model;
    /** The model associated with this query. */
    model?: ModelStatic;
    /** The query type used to adjust result processing. */
    type?: QueryTypes;
    /** Map from raw column name to model attribute name, or `true` to disable. */
    fieldMap?: Record<string, string> | boolean;
    /** If `true`, returns only the first row (or `null`). */
    plain: boolean;
    /** If `true`, returns raw objects instead of model instances. */
    raw: boolean;
    /** If `true`, uses dotted key nesting for raw results. */
    nest?: boolean;
    /** Internal flag indicating that the select has JOINs. */
    hasJoin?: boolean;
    /** Internal flag indicating presence of a multi association. */
    hasMultiAssociation?: boolean;
    /** Logging function or `false` to disable; `true` is deprecated. */
    logging?: boolean | ((sql: string, timing?: number) => void);
    /** If `true`, emits benchmark timings instead of raw SQL logging. */
    benchmark?: boolean;
    /** If `true`, logs bound parameter values. */
    logQueryParameters?: boolean;
    /** Optional label prefixed to the log line. */
    queryLabel?: string;
    /** Include definitions passed by the user. */
    include?: IncludeOptions[] | boolean;
    /** Resolved include names used by builder. */
    includeNames?: readonly string[];
    /** Resolved include map used by parser. */
    includeMap?: IncludeMap;
    /** The attributes originally selected by the user. */
    originalAttributes?: readonly string[];
    /** The attributes currently selected by the query. */
    attributes?: readonly string[];
    /** If `true`, skip error wrapping and re-throw database errors as-is. */
    rawErrors?: boolean;
    [key: string]: unknown;
}
export interface AbstractQueryFormatBindOptions {
    /** skip unescaping $$ */
    skipUnescape: boolean;
    /** do not replace (but do unescape $$) */
    skipValueReplace: boolean;
}
export declare class AbstractQuery {
    sql: string;
    readonly uuid: string;
    readonly connection: AbstractConnection;
    readonly instance?: Model | undefined;
    readonly model?: ModelStatic | undefined;
    readonly sequelize: Sequelize;
    options: AbstractQueryOptions;
    constructor(connection: AbstractConnection, sequelize: Sequelize, options?: AbstractQueryOptions);
    logWarnings<T>(results: T): Promise<T>;
    formatError<T extends Error>(error: T, errStack?: string): T;
    run(_sql: string, _parameters?: unknown, _options?: unknown): Promise<unknown>;
    private checkLoggingOption;
    protected getInsertIdField(): string;
    protected getUniqueConstraintErrorMessage(field?: string): string;
    protected isRawQuery(): boolean;
    protected isUpsertQuery(): boolean;
    protected isInsertQuery(results?: Record<string, unknown>, metaData?: Record<string, unknown>): boolean;
    protected handleInsertQuery(results?: Record<string, unknown>, metaData?: Record<string, unknown>): void;
    protected isShowIndexesQuery(): boolean;
    protected isShowConstraintsQuery(): boolean;
    protected isDescribeQuery(): boolean;
    protected isSelectQuery(): boolean;
    protected isBulkUpdateQuery(): boolean;
    protected isDeleteQuery(): boolean;
    protected isUpdateQuery(): boolean;
    /**
     * Post-processes a SELECT result set according to the query options:
     * - Remaps field names when `fieldMap` is provided.
     * - Returns raw nested objects when `raw` and `nest` are set.
     * - Groups JOINed rows into nested include graphs and builds model instances otherwise.
     *
     * @param results - The raw rows returned by the driver.
     * @returns Raw objects or built model instances depending on `options`.
     */
    protected handleSelectQuery(results: Array<Record<string, unknown>>): unknown;
    /**
     * Applies attribute-type parsing to an array of value objects.
     *
     * @param valueArrays - Array of objects to parse in-place.
     * @param model - The model providing attribute types for parsing.
     * @param includeMap - Include lookup map for nested parsing.
     * @returns The same array instance after parsing.
     */
    protected _parseDataArrayByType(valueArrays: Array<Record<string, unknown>>, model?: ModelStatic, includeMap?: IncludeMap): Array<Record<string, unknown>>;
    /**
     * Applies attribute-type parsing to a single object. Descends into includes when present.
     *
     * @param values - The object to mutate with parsed values.
     * @param model - The model providing attribute types for parsing.
     * @param includeMap - Include lookup map for nested parsing.
     * @returns The mutated `values` object.
     */
    protected _parseDataByType(values: Record<string, unknown>, model?: ModelStatic, includeMap?: IncludeMap): Record<string, unknown>;
    /**
     * Parses a raw database value using the attribute's data-type parser when available.
     *
     * @param value - The raw value to parse.
     * @param attributeType - The normalized data type to parse with.
     * @returns The parsed value, or the original value if no parser applies.
     */
    protected _parseDatabaseValue(value: unknown, attributeType?: NormalizedDataType): unknown;
    protected isShowOrDescribeQuery(): boolean;
    protected isCallQuery(): boolean;
    /**
     * Logs a SQL query with optional parameters and returns a function to log completion.
     * When benchmarking is enabled, the completion logger emits timing information.
     *
     * @param sql - The SQL string to log.
     * @param debugContext - A function receiving debug messages.
     * @param parameters - Optional bound parameters to display when enabled.
     * @returns A callback to be invoked after query execution to finalize logging.
     */
    protected _logQuery(sql: string, debugContext: (msg: string) => void, parameters?: unknown[] | Record<string, unknown>): () => void;
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
    static _groupJoinData(rows: Array<Record<string, unknown>>, includeOptions: RootIncludeOptions, options: AbstractQueryGroupJoinDataOptions): Array<Record<string, unknown>>;
}
export {};
