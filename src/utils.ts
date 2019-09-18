import cck = require('camelcase-keys');

/**
 * A simple wrapper around `camelcase-keys`, helps with TS issues around unknown
 * types. Always sets `deep: true`.
 */
export function camelcaseKeys(obj: any): any {
  return cck(obj, { deep: true });
}
