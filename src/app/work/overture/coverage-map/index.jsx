import React, { useEffect, useState, useRef } from "react";
import Background from "./Background";
import CAMX from "./CAMX";
import USA from "./USA";
import InfoBox from "./InfoBox";
import StatCounter from "./StatCounter";
import Intro from "./Intro";
import SearchBar from "./SearchBar";
import NetworkMembers from "./NetworkMembers";
import { Provider, createStore, combineReducers, useSelector, useDispatch } from "./redux/store";
import networkReducer, { buildInitialState } from "./redux/reducers/network";
import { setMemberStatesToUpdateOnMapAction, addUserToNetworkAction } from "./redux/actions/network";
import { platformAttorneys } from "./SearchBar/platformAttorneys";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// No production equivalent: visitor-facing shortcuts. "Simulate" is
// "someone just joined your network" without having to type a name into
// the search bar first — reuses ADD_USER_TO_NETWORK, the exact action a
// SearchBar selection dispatches, so both paths exercise the same reducer
// case and the same map diffing effect below. "Reset demo" calls back up
// to AutoplayDemo (onReset, threaded down through CoverageMapDemo and
// CoverageMapPage) rather than dispatching something on this store: a
// reset remounts the whole tree — a fresh store, a clean DOM for the
// entrance animation to replay from, and "Play the entrance animation"
// back too — the same remount AutoplayDemo already does for Play itself.
const DemoControls = ({ onReset }) => {
  const dispatch = useDispatch();
  const networkStates = useSelector(state => state.network.networkStates);

  const simulateConnection = () => {
    const notYetInNetwork = platformAttorneys.filter(a => {
      const existing = networkStates[a.state];
      return !existing || !existing.some(x => x.full_name === a.full_name);
    });
    if (notYetInNetwork.length === 0) return;
    const next = notYetInNetwork[Math.floor(Math.random() * notYetInNetwork.length)];
    dispatch(addUserToNetworkAction(next));
  };

  return (
    <>
      <button type="button" className="coverage-map__demo-control" onClick={simulateConnection}>
        Simulate a new referral connection
      </button>
      <button type="button" className="coverage-map__demo-control coverage-map__demo-control--reset" onClick={onReset}>
        Reset demo
      </button>
    </>
  );
};

// Ported from CoverageMap/index.js. The reducer only ever appends to
// networkMembersAdded (see redux/reducers/network.js); it's this effect,
// not the reducer, that diffs the latest addition against the previous
// render's member list to decide which map states are genuinely new vs.
// already covered by someone else — matching the original's own division
// of labor between "data changed" and "what does that mean for the map".
const CoverageMap = ({ isMinimal, showPlayTrigger, onPlay, onReset }) => {
  const dispatch = useDispatch();
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  const networkMembers = useSelector(state => state.network.networkMembers);
  const networkMembersAdded = useSelector(state => state.network.networkMembersAdded);
  const [prevNetworkMembers, setPrevNetworkMembers] = useState(networkMembers.results);

  useEffect(() => {
    dispatch(setMemberStatesToUpdateOnMapAction({ new: [], existing: [] }));
  }, []);

  useEffect(() => {
    if (networkMembers.results.length > 0 && networkMembersAdded.length > 0) {
      if (networkMembers.results.length !== prevNetworkMembers.length) {
        const realMembers = networkMembers.results.filter(x => x.model_name == "NetworkMember");
        const prevStates = prevNetworkMembers.filter(x => x.model_name == "NetworkMember").flatMap(y => y.practice_states);
        const lastAdded = networkMembersAdded[networkMembersAdded.length - 1];
        const addedStates = lastAdded.practice_states ?? [];

        let newStates = [];
        let existingStates = [];

        if (realMembers.length == 1 && lastAdded.model_name == "NetworkMember") {
          newStates = lastAdded.practice_states;
        }

        if (realMembers.length > 1) {
          existingStates = addedStates.filter(x => prevStates.includes(x));
          newStates = addedStates.filter(x => !prevStates.includes(x));
        }

        // Not in the original: a visitor who prefers reduced motion gets
        // the addition (counts, the member list below) without the map
        // pulse.
        if (!prefersReducedMotion()) {
          dispatch(setMemberStatesToUpdateOnMapAction({ new: newStates, existing: existingStates }));
        }

        setTimeout(() => {
          setPrevNetworkMembers(networkMembers.results);
        }, 3000);
      }
    }
  }, [networkMembers, networkMembersAdded]);

  return (
    <div className={`coverage-map ${isMinimal ? "coverage-map--minimal" : ""}`}>
      {!isMinimal && <InfoBox />}
      <div className={`coverage-map__globe ${disableAnimation ? "animation-disabled" : "animate-in"}`}>
        <div className="coverage-map__north-america">
          <USA />
          <CAMX />
        </div>
      </div>
      <Background />
      {!isMinimal && <StatCounter />}
      {!isMinimal && <DemoControls onReset={onReset} />}
      {/* Rendered here, not by AutoplayDemo as a sibling of the whole demo,
          so its position:50%/50% centers on just the globe (.coverage-map's
          own position:relative) — centering against the full demo (map +
          search card + member list) would put it well below the globe. */}
      {!isMinimal && showPlayTrigger && (
        <button type="button" className="coverage-map__play" onClick={onPlay}>
          <span className="coverage-map__play__icon" />
          Play the entrance animation
        </button>
      )}
    </div>
  );
};

const CoverageMapPage = ({ variant, showPlayTrigger, onPlay, onReset }) => {
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  const isMinimal = variant === "minimal";

  return (
    <>
      <CoverageMap isMinimal={isMinimal} showPlayTrigger={showPlayTrigger} onPlay={onPlay} onReset={onReset} />
      {!isMinimal && (
        <>
          <div className={`coverage-map__panel ${disableAnimation ? "animation-disabled" : "animate-in"}`}>
            <Intro />
            <SearchBar />
          </div>
          <NetworkMembers />
        </>
      )}
    </>
  );
};

// `disableAnimation` seeds the initial render: the autoplay wrapper mounts
// this fresh (via a key bump) each time it wants the entrance sequence to
// play — or a visitor hits "Reset demo" — and passes true instead when
// prefers-reduced-motion applies. `variant` rides along in store state
// (rather than being threaded through USA -> USState as a prop) so USState
// can read it to slow its stagger for the hero without the full demo's
// feel changing. `showPlayTrigger`/`onPlay`/`onReset` all come from
// AutoplayDemo, which owns whether the entrance has been played yet.
const CoverageMapDemo = ({ variant = "full", disableAnimation = false, showPlayTrigger = false, onPlay, onReset }) => {
  const storeRef = useRef(null);
  if (storeRef.current === null) {
    const rootReducer = combineReducers({ network: networkReducer });
    storeRef.current = createStore(rootReducer, { network: buildInitialState({ disableAnimation, variant }) });
  }

  return (
    <Provider store={storeRef.current}>
      <CoverageMapPage variant={variant} showPlayTrigger={showPlayTrigger} onPlay={onPlay} onReset={onReset} />
    </Provider>
  );
};

export default CoverageMapDemo;
