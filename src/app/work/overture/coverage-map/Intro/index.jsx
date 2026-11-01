import React from "react";
import { useSelector } from "../redux/store";

// Ported from the original Overture page's load sequence: a pretext label and
// headline blur/fade in ahead of the map and search bar below them.
const Intro = () => {
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  const cls = disableAnimation ? "animation-disabled" : "animate-in";

  return (
    <div className="coverage-map__intro">
      <span className={`coverage-map__intro__pretext ${cls}`}>WELCOME TO YOUR TRUSTED NETWORK</span>
      <h3 className="coverage-map__intro__title">
        <span className={cls}>Search your network.</span>
        <span className={cls}>Watch your coverage light up <strong>state by state</strong>.</span>
      </h3>
    </div>
  );
};

export default Intro;
