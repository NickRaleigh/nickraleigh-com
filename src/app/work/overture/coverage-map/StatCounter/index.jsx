import React, { useState, useEffect, useMemo } from "react";
import CountUp from "./CountUp";
import { useSelector } from "../redux/store";
import { plurify, classify } from "../helpers";

const StatCounter = () => {
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  const networkMembers = useSelector(state => state.network.networkMembers);
  const networkStates = useSelector(state => state.network.networkStates);
  const networkStatesCount = useSelector(state => state.network.networkStatesCount);
  const [pulsate, setPulsate] = useState(false);
  const [prevNetworkStatesCount, setPrevNetworkStatesCount] = useState(0);
  const [prevNetworkMembersLength, setPrevNetworkMembersLength] = useState(0);

  const memberCount = networkMembers.results.length;

  const statesWithoutDcCount = useMemo(() => {
    if (networkStates["District of Columbia"] && networkStates["District of Columbia"].length > 0) {
      return networkStatesCount - 1;
    } else {
      return networkStatesCount;
    }
  }, [networkStatesCount]);

  useEffect(() => {
    if (statesWithoutDcCount > 0 || memberCount > 0) {
      setPulsate(true);
      setTimeout(() => {
        setPulsate(false);
        setPrevNetworkStatesCount(statesWithoutDcCount);
        setPrevNetworkMembersLength(memberCount);
      }, 3000);
    }
  }, [statesWithoutDcCount, memberCount]);

  return (
    <div className={`inner-circle-search__stat-counter ${disableAnimation ? "animation-disabled" : "animate-in"}`}>
      <div className="inner-circle-search__stat-counter__wrapper">

        <div className={`${classify("inner-circle-search__stat-counter__stat", { "states": true, "pulsate": pulsate, "none": statesWithoutDcCount == 0 })}`}>
          <CountUp className="inner-circle-search__stat-counter__stat__countup" start={prevNetworkStatesCount} end={statesWithoutDcCount} duration={2.5} />
          <span>{plurify(" State", statesWithoutDcCount)}</span>
        </div>

        <div className={`${classify("inner-circle-search__stat-counter__stat", { "attorney": true, "pulsate": pulsate, "none": memberCount == 0 })}`}>
          <CountUp className="inner-circle-search__stat-counter__stat__countup" start={prevNetworkMembersLength} end={memberCount} duration={2.5} />
          <span>{plurify(" Attorney", memberCount)}</span>
        </div>

      </div>
    </div>
  );
};

export default StatCounter;
