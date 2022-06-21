let currentCollection;

const rawReactionMap = new WeakMap();

export function observer(value) {
  return new Proxy(value, baseHandler);
}

function collectionTarget(target, key) {
  const reactionMap = rawReactionMap.get(target);
  if (reactionMap) {
    const keyMap = reactionMap.get(key);
    if (!keyMap) {
      reactionMap.set(key, [currentCollection]);
    } else {
      keyMap.push(currentCollection);
    }
  } else {
    const reactionMap = new Map();
    rawReactionMap.set(target, reactionMap);
    reactionMap.set(key, [currentCollection]);
  }
}

const baseHandler = {
  get(target, key) {
    if (currentCollection) {
      collectionTarget(target, key);
    }
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    rawReactionMap
      .get(target)
      ?.get(key)
      ?.forEach((reaction) => {
        if (reaction.__scheme && typeof reaction.__scheme == 'function') {
          reaction.__scheme();
        } else {
          reaction();
        }
      });
    return true;
  },
};

export function autoRun(track) {
  const reaction = () => {
    currentCollection = reaction;
    track();
    currentCollection = null;
  };
  reaction();
}

export class Tracker {
  constructor(scheme) {
    this.track.__scheme = scheme;
  }
  track: any = (tracker) => {
    currentCollection = this.track;
    const result = tracker();
    currentCollection = null;
    return result;
  };
}

// const obs = observer({name: 'perfectyang', age: 111})

// const track = () => {
//   console.log('111', obs.name)
//   console.log('111', obs.age)
// }
// autoRun(track)

// // obs.name = 'aaa'
// obs.age = 222
