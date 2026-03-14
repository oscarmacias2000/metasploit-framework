/**
 * Tiny precompiler + setter to replace Dottie.transform for flat "a.b[0].c" keys.
 * Advantages:
 * - No deps
 * - Handles dot paths and [number] array indices
 * - Fast: pre-tokenizes keys once, then does straight-line writes
 *
 * some linting rules are skipped for performance optimizations.
 */
type PathSeg = string | number;
export interface CompiledPath {
    sourceKey: string;
    path: PathSeg[];
}
export interface PrecompiledTransform {
    compiled: CompiledPath[];
    index: Map<string, PathSeg[]>;
}
/**
 * Tokenize a single flat path like: "a.b[0].c"
 * - Dots split object keys
 * - Brackets with digits create numeric array indices
 * - Does NOT implement escaping / quoted keys; keep keys simple for max perf
 *
 * @param key The flat key to tokenize
 */
export declare function tokenizePath(key: string): PathSeg[];
/**
 * Precompile all keys once per result-set shape.
 * Pass in the enumerable keys you will transform (e.g., Object.keys(row)).
 *
 * @param keys The flat keys to precompile
 */
export declare function precompileKeys(keys: readonly string[]): PrecompiledTransform;
/**
 * Set a value by a tokenized path on the target, creating intermediate objects/arrays.
 * Creates arrays when the next segment is a number, objects otherwise.
 *
 * @param target The target object to set the value on
 * @param path The tokenized path array
 * @param value The value to set
 */
export declare function setByPathArray(target: Record<string, unknown>, path: readonly PathSeg[], value: unknown): void;
/**
 * Transform a flat row with precompiled paths into a nested object.
 * Optionally reuse an output object (e.g., from a pool) for fewer allocations.
 *
 * @param row The flat row object to transform
 * @param pre The precompiled transform data
 * @param out Optional output object to reuse
 */
export declare function transformRowWithPrecompiled(row: Record<string, unknown>, pre: PrecompiledTransform, out?: Record<string, unknown>): Record<string, unknown>;
/**
 * Acquire an object from a simple pool and clear its own keys.
 *
 * @param pool Pool of reusable plain objects
 * @returns A cleared object ready for reuse
 */
export declare function acquirePooledObject(pool: Array<Record<string, unknown>>): Record<string, unknown>;
export declare function releasePooledObject(pool: Array<Record<string, unknown>>, obj: Record<string, unknown>): void;
export {};
