import {promisify} from "util";
import {Duration} from "@prodo-ai/js-timing";

export type MaybePromise<T> = Promise<T> | T;

export interface KeepTryingParams<T> {
  behaviour: () => Promise<T> | T;
  until?: (value: T) => boolean;
  ignoreErrors?: boolean;
  timeout?: Duration;
  inbetweenAttempts?: () => Promise<void> | void;
}

export interface WaitUntilParams {
  condition: () => Promise<boolean> | boolean;
  pauseTime: Duration;
  timeout?: Duration;
}

export const denodeify: typeof promisify;
export const fromCallback: typeof promisify;
export function keepTrying<T>(params: KeepTryingParams<T>): Promise<T>;
export function tryAgain<T>(
  behaviour: () => Promise<T> | T,
  isSuccess: (value: T) => boolean,
  isFailure: (error: Error | null) => boolean,
  onSuccess: (value: T) => void,
  onFailure: (error: Error | null) => void,
  inbetweenAttempts: (() => Promise<void> | void) | null,
): Promise<void>;
export function waitUntil(params: WaitUntilParams): Promise<boolean>;
