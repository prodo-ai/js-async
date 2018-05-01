// @flow

import type {KeepTryingParams} from "./types";

import {tryAgain} from "./try-again";
import {MILLISECONDS} from "@prodo-ai/js-timing";

export function keepTrying<T>({
  behaviour,
  until,
  ignoreErrors,
  inbetweenAttempts,
  timeout,
}: KeepTryingParams<T>): Promise<T> {
  let failure = false;
  if (timeout) {
    setTimeout(() => (failure = true), timeout.in(MILLISECONDS));
  }
  return new Promise((resolve, reject) =>
    tryAgain(
      behaviour,
      until || (result => result != null),
      error =>
        ((ignoreErrors === undefined || !ignoreErrors) && error != null) ||
        failure,
      resolve,
      reject,
      inbetweenAttempts,
    ),
  );
}
