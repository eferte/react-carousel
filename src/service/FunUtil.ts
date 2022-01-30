import { isFunction } from "../type/utils";

export function later(durationMsOrPredicat: number | (() => boolean) = 10) {
  if (isFunction(durationMsOrPredicat)) {
    return new Promise(async (resolve, reject) => {
      let cpt = 0;

      while (!durationMsOrPredicat()) {
        cpt++;
        await later(500);
        if (cpt > 1000) {
          reject();
        }
      }
      resolve(undefined);
    });
  } else {
    return new Promise((resolve) => {
      setTimeout(resolve, durationMsOrPredicat);
    });
  }
}

// check if arrays have same items in same order
// only shallow compare items.
export function areArraysShallowEqual(first: any[], second: any[]) {
  if (!first && !second && first === second) {
    return true;
  }
  if (!first || !second) {
    return false;
  }
  if (first.length !== second.length) {
    return false;
  }

  for (let i = 0; i < first.length; i++) {
    if (second[i] !== first[i]) {
      return false;
    }
  }

  return true;
}
