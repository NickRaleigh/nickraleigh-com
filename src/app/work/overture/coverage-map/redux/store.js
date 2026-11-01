import React, { createContext, useContext, useSyncExternalStore } from "react";

/* ==========================================================================
   store.js
   --------------------------------------------------------------------------
   A minimal stand-in for Redux + react-redux: the original Inner Circle
   page read its network state through useSelector/useDispatch against a
   real Redux store (redux-toolkit, redux-saga handling the async
   "_REQUEST" -> API call -> "_SUCCESS"/"_FAILURE" actions). This demo has
   no backend to saga against, so rather than pull in the real libraries for
   a store that only ever holds mock data, this re-implements just the
   surface every component actually calls: createStore, Provider,
   useSelector, useDispatch. Same call sites as the original
   (`useSelector(state => state.network.x)`, `dispatch(someAction())`), a
   much smaller engine underneath.
   ========================================================================== */

// A minimal stand-in for Redux's own combineReducers: the real app's root
// reducer combines a "network" slice with "user", "profile", and others,
// which is why every call site reads `state.network.x` rather than `state.x`
// — a detail this demo keeps even though network is the only slice it has.
export function combineReducers(slices) {
  const keys = Object.keys(slices);
  return function rootReducer(state = {}, action) {
    const next = {};
    keys.forEach(function (key) {
      next[key] = slices[key](state[key], action);
    });
    return next;
  };
}

export function createStore(reducer, preloadedState) {
  let state = preloadedState;
  const listeners = new Set();

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(function (listener) {
      listener();
    });
    return action;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return function () {
      listeners.delete(listener);
    };
  }

  return { getState: getState, dispatch: dispatch, subscribe: subscribe };
}

const StoreContext = createContext(null);

export function Provider(props) {
  return React.createElement(StoreContext.Provider, { value: props.store }, props.children);
}

function useStore() {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useSelector/useDispatch must be used within a <Provider>");
  }
  return store;
}

// Subscribes to the whole store and re-renders whenever `selector` returns a
// new value; real react-redux does the same shallow-compare-less default.
// Call sites follow the original's own rule of thumb (see each component's
// comment): select only the slice you need, not the whole state.network,
// or every unrelated change re-renders you too.
export function useSelector(selector) {
  const store = useStore();
  const getSnapshot = function () {
    return selector(store.getState());
  };
  // Third arg (getServerSnapshot) added for Next.js: this mock store's
  // state is synthetic and deterministic at creation time, so the server
  // snapshot is just the same read — not part of the original's own
  // useSelector, which never ran under SSR.
  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}

export function useDispatch() {
  return useStore().dispatch;
}
