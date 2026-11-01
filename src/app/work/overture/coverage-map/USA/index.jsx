import React, { useEffect, useState } from "react";
import USState from "./USState";
import { useSelector } from "../redux/store";

// Matches .coverage-map__globe's own entrance timing (delay + duration;
// see _coverage-map.scss) for each variant — the window during which the
// globe is still fading/rising and states are still staggering in.
const LOCK_MS = { full: 7000, minimal: 5500 };

const USA = () => {
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  const variant = useSelector(state => state.network.variant);
  // Starts locked whenever this mounts already animating (every Play or
  // Reset remounts fresh — see AutoplayDemo), so a visitor can't hover a
  // state (showing the info box) or trigger a state's own hover fill
  // before the map has actually finished forming. disableAnimation is
  // fixed for this mount's whole lifetime (nothing dispatches
  // SET_DISABLED_ANIMATION), so there's no later transition to react to —
  // just a one-time timer sized to how long the entrance actually takes.
  const [locked, setLocked] = useState(!disableAnimation);

  useEffect(() => {
    if (!disableAnimation) {
      const duration = variant === "minimal" ? LOCK_MS.minimal : LOCK_MS.full;
      const timer = window.setTimeout(() => setLocked(false), duration);
      return () => window.clearTimeout(timer);
    }
  }, []);

  return (
    <div className={`coverage-map__USA ${disableAnimation ? "animation-disabled" : "animate-in"}${locked ? " coverage-map__USA--locked" : ""}`}>
      <img className="coverage-map__USA__ak-hi-border" alt="" src="/imgs/coverage-map/ak-hi-border.svg" />
      <svg className="coverage-map__USA__svg" id="svg1" width="383.04111mm" height="158.40202mm" viewBox="0 0 383.04112 158.40203" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="layer2" transform="translate(-107.85964,-8.123215)">
          <g id="g94" transform="matrix(0.29261479,0,0,0.29261479,414.75208,-3.5730388)">
            <g className="coverage-map__USA__states" id="USA" transform="matrix(0.58028352,0,0,0.58028352,-775.05502,72.373549)">
              <USState id="FL" name="Florida" />
              <USState id="SC" name="South Carolina" />
              <USState id="GA" name="Georgia" />
              <USState id="AL" name="Alabama" />
              <USState id="NC" name="North Carolina" />
              <USState id="TN" name="Tennessee" />
              <USState id="RI" name="Rhode Island" />
              <USState id="CT" name="Connecticut" />
              <USState id="MA" name="Massachusetts" />
              <USState id="ME" name="Maine" />
              <USState id="NH" name="New Hampshire" />
              <USState id="VT" name="Vermont" />
              <USState id="NY" name="New York" />
              <USState id="NJ" name="New Jersey" />
              <USState id="PA" name="Pennsylvania" />
              <USState id="DE" name="Delaware" />
              <USState id="MD" name="Maryland" />
              <USState id="WV" name="West Virginia" />
              <USState id="KY" name="Kentucky" />
              <USState id="OH" name="Ohio" />
              <USState id="MI" name="Michigan" />
              <USState id="WY" name="Wyoming" />
              <USState id="MT" name="Montana" />
              <USState id="ID" name="Idaho" />
              <USState id="WA" name="Washington" />
              <USState id="TX" name="Texas" />
              <USState id="CA" name="California" />
              <USState id="AZ" name="Arizona" />
              <USState id="NV" name="Nevada" />
              <USState id="UT" name="Utah" />
              <USState id="CO" name="Colorado" />
              <USState id="NM" name="New Mexico" />
              <USState id="OR" name="Oregon" />
              <USState id="ND" name="North Dakota" />
              <USState id="SD" name="South Dakota" />
              <USState id="NE" name="Nebraska" />
              <USState id="IA" name="Iowa" />
              <USState id="MS" name="Mississippi" />
              <USState id="IN" name="Indiana" />
              <USState id="IL" name="Illinois" />
              <USState id="MN" name="Minnesota" />
              <USState id="WI" name="Wisconsin" />
              <USState id="MO" name="Missouri" />
              <USState id="AR" name="Arkansas" />
              <USState id="OK" name="Oklahoma" />
              <USState id="KS" name="Kansas" />
              <USState id="LA" name="Louisiana" />
              <USState id="VA" name="Virginia" />
              <g id="DC-region">
                <path className="coverage-map__USA__region" id="path58" d="m 975.8,353.8 -1.1,-1.6 -1,-0.8 1.1,-1.6 2.2,1.5 z" />
                <USState id="DC" name="District of Columbia" />
              </g>
              <g id="g93" className="coverage-map__USA__ak-hi" transform="translate(-290.72251,-95.623899)">
                <USState id="HI" name="Hawaii" />
                <USState id="AK" name="Alaska" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
export default USA;
