/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
