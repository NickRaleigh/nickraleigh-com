import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "../redux/store";
import { plurify } from "../helpers";

const InfoBox = () => {
  const hovered = useSelector(state => state.network.hovered);
  const networkStates = useSelector(state => state.network.networkStates);
  const [attorneys, setAttorneys] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [subText, setSubText] = useState("");
  const [iterableAttorneys, setIterableAttorneys] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const infoBoxRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hovered && coordinates && infoBoxRef.current) {
      positionInfoBox();
    }
  }, [hovered]);

  const positionInfoBox = () => {
    const infoBox = infoBoxRef.current;
    if (!infoBox || !coordinates) return;
    infoBox.style.left = coordinates[0];
    infoBox.style.top = coordinates[1];
  };

  const handleMouseMove = (e) => {
    if (infoBoxRef.current) {
      const infoBox = infoBoxRef.current;
      // Positioned fixed against the viewport (via a portal to document.body)
      // rather than relative to `.coverage-map`, whose `overflow: hidden`
      // (needed for the globe reveal) would otherwise clip the box whenever
      // it landed near an edge of the map.
      let xCoordinate = e.clientX - 40;
      let yCoordinate = Math.max(8, e.clientY - infoBox.offsetHeight - 30);

      setCoordinates([xCoordinate + "px", yCoordinate + "px"]);
    }
  };

  useEffect(() => {
    if (coordinates && infoBoxRef.current) {
      positionInfoBox();
    }
  }, [coordinates]);

  useEffect(() => {
    if (attorneys) {
      if (attorneys.length === 1) {
        setSubText(attorneys[0].full_name);
      } else if (attorneys.length > 1) {
        setSubText(`Including ${attorneys[0].full_name} and ${attorneys[1].full_name}`);
      } else {
        setSubText("");
      }

      if (attorneys.length > 3) {
        setIterableAttorneys(attorneys.slice(0, 3));
      } else {
        setIterableAttorneys(attorneys);
      }
    }
  }, [attorneys]);

  useEffect(() => {
    if (hovered && hovered !== null && networkStates) {
      let focusedState = networkStates[hovered];
      if (focusedState && focusedState.length) {
        setAttorneys(focusedState);
      } else {
        setAttorneys([]);
      }
    }
  }, [hovered, networkStates]);

  if (hovered) {
    return createPortal(
      <div ref={infoBoxRef} className="coverage-map__info-box" id="info-box" style={{ position: "fixed", top: position.top, left: position.left, zIndex: 100 }}>
        <div className="coverage-map__info-box__wrapper">
          <h3 className="coverage-map__info-box__title loose-caps">{hovered}</h3>
          {attorneys.length > 0 &&
            <div className="coverage-map__info-box__attorneys">
              <div className="coverage-map__info-box__attorneys__img-wrapper">
                {iterableAttorneys.map((x, i) =>
                  <div className="coverage-map__info-box__attorneys__img animate-in" key={`attorney-coverage-${i}`}>
                    {x.avatar
                      ? <img className="coverage-map__info-box__attorneys__photo" src={`/uploads/coverage-map/avatars/${x.avatar}`} alt="" />
                      : x.initials}
                  </div>
                )}
                {(iterableAttorneys.length < attorneys.length) &&
                  <div className="coverage-map__info-box__attorneys__img coverage-map__info-box__attorneys__img--overflow animate-in">+{attorneys.length - iterableAttorneys.length}</div>
                }
              </div>

              <div className="coverage-map__info-box__attorneys__count">
                {plurify("%d Attorney", attorneys.length)}
              </div>
              <span className="coverage-map__info-box__attorneys__list">{subText}</span>
            </div>
          }
        </div>
      </div>,
      document.body
    );
  } else {
    return <></>;
  }
};

export default InfoBox;
