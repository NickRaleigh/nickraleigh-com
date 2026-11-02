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

// Dev-only shortcuts, nothing like this ships. Simulate just dispatches
// ADD_USER_TO_NETWORK directly, the same action a real SearchBar pick
// sends. Reset calls back up to AutoplayDemo instead of touching this
// store, since a reset remounts the whole tree (fresh store, clean DOM,
// entrance animation ready to replay).
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

// The reducer only ever appends to networkMembersAdded (see
// redux/reducers/network.js). This effect does the actual work of
// deciding which of those states are new to the map vs. already covered
// by someone else.
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

        // Reduced motion: still update the counts and member list,
        // just skip the map pulse.
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
      {/* Positioned here, not by AutoplayDemo, so it centers on the globe
          alone instead of the full demo (map + search card + member list). */}
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

// disableAnimation seeds the initial render: AutoplayDemo remounts this
// fresh (via a key bump) whenever it wants the entrance to replay, true
// when prefers-reduced-motion applies. variant lives in store state
// rather than a USA/USState prop, so USState can slow its stagger for
// the hero without changing how the full demo feels.
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
