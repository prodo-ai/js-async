// @flow

import type {WaitUntilParams} from "./types";

import {keepTrying} from "./keep-trying";
import {waitFor} from "@prodo-ai/js-timing";

export function waitUntil({
  condition,
  pauseTime,
  timeout,
}: WaitUntilParams): Promise<boolean> {
  return keepTrying({
    behaviour: condition,
    until: result => result,
    ignoreErrors: false,
    timeout,
    inbetweenAttempts: () => waitFor(pauseTime),
  });
}
