import { useReducer, useRef } from 'react';
import { Tracker } from './formily';

function Observer(props) {
  const [, useUpated] = useReducer((x) => x + 1, 0);
  const trackRef = useRef(null);
  if (!trackRef.current) {
    trackRef.current = new Tracker(useUpated);
  }
  return trackRef.current.track(props.children);
}
export default Observer;
