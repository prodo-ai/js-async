// @flow

import {keepTrying} from "../src";
import {duration, MILLISECOND, SECONDS} from "@prodo-ai/js-timing";
import test from "ava";
import td from "testdouble";

test("`keepTrying` returns the result if it's an immediate success", async t => {
  const result = await keepTrying({
    behaviour: () => 1,
    timeout: duration(10, SECONDS),
  });

  t.is(result, 1);
});

test("`keepTrying` fails on error by default", async (t): Promise<void> => {
  const error = await t.throws(
    keepTrying({
      behaviour: () => {
        throw new Error("Test error.");
      },
      timeout: duration(10, SECONDS),
    }),
  );

  t.is(error.message, "Test error.");
});

test("`keepTrying` can ignore errors", async t => {
  const behaviour = td.function("behaviour");
  td
    .when(behaviour())
    .thenReturn(
      Promise.reject("Ignore me."),
      Promise.reject("Still ignore me."),
      Promise.resolve("Success!"),
    );

  const result = await keepTrying({
    behaviour,
    ignoreErrors: true,
    timeout: duration(10, SECONDS),
  });

  t.is(result, "Success!");
});

test("`keepTrying` can have intermediate behaviours", async t => {
  let counter = 0;
  let increment = () => {
    counter += 1;
  };

  const behaviour = td.function("behaviour");
  td
    .when(behaviour())
    .thenReturn(
      Promise.reject("Ignore me."),
      Promise.reject("Still ignore me."),
      Promise.resolve("Success!"),
    );

  await keepTrying({
    behaviour,
    ignoreErrors: true,
    timeout: duration(10, SECONDS),
    inbetweenAttempts: increment,
  });

  t.is(counter, 2);
});

test("`keepTrying` returns a result if it's an eventual success", async t => {
  let counter = 0;
  let increment = () => {
    counter += 1;
  };

  const behaviour = td.function("behaviour");
  td.when(behaviour()).thenReturn(undefined, undefined, undefined, 1);

  const result = await keepTrying({
    behaviour,
    timeout: duration(10, SECONDS),
    inbetweenAttempts: increment,
  });

  t.is(result, 1);
  t.is(counter, 3);
});

test("`keepTrying` can accept success conditions", async t => {
  const behaviour = td.function("behaviour");
  td.when(behaviour()).thenReturn(1, 2, 3, 4);
  const result = await keepTrying({
    behaviour,
    until: result => result > 2,
    timeout: duration(10, SECONDS),
  });

  t.is(result, 3);
});

test("`keepTrying` eventually times out", async t => {
  const error = await t.throws(
    keepTrying({
      behaviour: () => 0,
      until: () => false,
      timeout: duration(1, MILLISECOND),
    }),
  );

  t.is(error.message, "Timed out.");
});
