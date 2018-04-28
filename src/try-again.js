// @flow

import {duration, MILLISECOND, waitFor} from "@prodo-ai/js-timing";

export async function tryAgain<T>(
  behaviour: () => Promise<T> | T,
  isSuccess: (value: T) => boolean,
  isFailure: (error: ?Error) => boolean,
  onSuccess: (value: T) => void,
  onFailure: (error: ?Error) => void,
  inbetweenAttempts: ?() => Promise<void> | void,
): Promise<void> {
  try {
    const result = await behaviour();
    if (isSuccess(result)) {
      return onSuccess(result);
    }
    if (isFailure()) {
      return onFailure(new Error("Timed out."));
    }
  } catch (error) {
    if (isFailure(error)) {
      onFailure(error);
      return;
    }
  }
  if (inbetweenAttempts) {
    await inbetweenAttempts();
  }
  await waitFor(duration(1, MILLISECOND));
  return tryAgain(
    behaviour,
    isSuccess,
    isFailure,
    onSuccess,
    onFailure,
    inbetweenAttempts,
  );
}
