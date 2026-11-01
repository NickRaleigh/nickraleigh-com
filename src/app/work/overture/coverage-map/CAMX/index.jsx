import React from "react";
import { useSelector } from "../redux/store";

const CAMX = () => {
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  return (
    <div className={`coverage-map__canada-and-mexico ${disableAnimation ? "animation-disabled" : "animate-in"}`}>
      <img alt="Canada and Mexico" src="/imgs/coverage-map/ca-mx.svg" />
    </div>
  );
};
export default CAMX;
