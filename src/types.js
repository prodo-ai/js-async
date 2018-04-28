// @flow

import type {Duration} from "@prodo-ai/js-timing";

export type MaybePromise<T> = Promise<T> | T;

export type KeepTryingParams<T> = {|
  behaviour: () => Promise<T> | T,
  until?: (value: T) => boolean,
  ignoreErrors?: boolean,
  timeout?: Duration,
  inbetweenAttempts?: () => Promise<void> | void,
|};

export type WaitUntilParams = {|
  condition: () => Promise<boolean> | boolean,
  pauseTime: Duration,
  timeout?: Duration,
|};
