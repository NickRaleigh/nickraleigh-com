import React, { useState, useEffect } from "react";
import usStateData from "./state-geometry.json";
import { useSelector, useDispatch } from "../../redux/store";
import { setUserInnerCircleHoveredAction } from "../../redux/actions/network";
import { classify } from "../../helpers";

const geometry = usStateData;

// Two-letter postal code (the SVG path/circle id) plus the state's full name
// (used to key into networkStates and the geometry lookup below).
const USState = ({ id, name }) => {
  const dispatch = useDispatch();

  // don't destructure the whole state.network, otherwise this rerenders every
  // time any property changes. We only need to react to the properties below.
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  // The hero reveal is slower than the in-product demo: stretching the
  // random delay's range spreads the stagger out instead of finishing in
  // the first half second. No production equivalent; the real page only
  // ever rendered the one variant.
  const variant = useSelector(state => state.network.variant);
  const isMinimal = variant === "minimal";
  const staggerRange = isMinimal ? 1400 : 1800;
  const networkMembers = useSelector(state => state.network.networkMembers);
  const memberStatesToUpdateOnMap = useSelector(state => state.network.memberStatesToUpdateOnMap);

  const currentState = geometry.filter(x => x.id == id)[0];
  const [randomAnimationDelay, setRandomAnimationDelay] = useState(0);

  const [isActive, setIsActive] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const [key, setKey] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  // Matches .coverage-map__globe's own entrance delay (2s full, 0.5s
  // minimal, see _coverage-map.scss), so states light up while the globe
  // itself is still fading/rising in, not before or after.
  const animationTimeout = isMinimal ? 500 : 2000;

  useEffect(() => {
    if (memberStatesToUpdateOnMap) {
      if (memberStatesToUpdateOnMap.new && memberStatesToUpdateOnMap.new.length > 0) {
        if (memberStatesToUpdateOnMap.new.indexOf(name) > -1) {
          setIsAdded(true);
        }
      }
      if (memberStatesToUpdateOnMap.existing && memberStatesToUpdateOnMap.existing.length > 0) {
        if (memberStatesToUpdateOnMap.existing.indexOf(name) > -1) {
          setIsExisting(true);
          setKey(key + 1);
          setRandomAnimationDelay(0);
        }
      }
    }
  }, [memberStatesToUpdateOnMap.new, memberStatesToUpdateOnMap.existing]);

  const checkIfActive = () => {
    const results = networkMembers.results;
    if (disableAnimation) {
      setIsActive(results.filter(x => x.practice_states !== undefined && x.practice_states !== null).some(y => y.practice_states.some(z => z == name)));
    } else {
      setTimeout(() => {
        setIsActive(results.filter(x => x.practice_states !== undefined && x.practice_states !== null).some(y => y.practice_states.some(z => z == name)));
      }, animationTimeout);
    }
  };

  const getRandomInteger = () => {
    return Math.floor(Math.random() * (staggerRange + 1));
  };

  useEffect(() => {
    checkIfActive();
    setRandomAnimationDelay(getRandomInteger());
  }, []);

  useEffect(() => {
    if (networkMembers) {
      checkIfActive();
    }
  }, [networkMembers]);

  const handleMouseOver = () => {
    // Only wired up to elements rendered inside `if (currentState)` below, so
    // this is always defined in practice.
    if (currentState) {
      dispatch(setUserInnerCircleHoveredAction(currentState.name));
    }
  };

  const handleMouseOut = () => {
    dispatch(setUserInnerCircleHoveredAction(null));
  };

  if (currentState) {
    if (currentState.id != "DC") {
      return (
        <path key={key}
              onMouseOver={isActive ? handleMouseOver : handleMouseOut}
              onMouseOut={handleMouseOut}
              style={{ animationDelay: `${randomAnimationDelay}ms` }}
              id={id}
              d={currentState.svgData}
              className={` ${classify("coverage-map__USA__state", {
                "selected": isActive && !isAdded && !isExisting,
                "added": isAdded && !isExisting,
                "existing": isExisting,
              })} coverage-map__USA__state--${id}`} />
      );
    } else {
      return (
        <circle onMouseOver={isActive ? handleMouseOver : handleMouseOut}
                onMouseOut={handleMouseOut}
                style={{ animationDelay: `${randomAnimationDelay}ms` }}
                stroke="#ffffff"
                strokeWidth="2.33731"
                cx="975.29999"
                cy="351.79999"
                r="5"
                className={` ${classify("coverage-map__USA__state", {
                  "selected": isActive && !isAdded,
                  "added": isActive && isAdded,
                  "existing": isExisting,
                })} coverage-map__USA__state--${id}`} />
      );
    }
  }
};

export default USState;
