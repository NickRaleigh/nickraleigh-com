import React from "react";
import { useSelector } from "../redux/store";

// `loading` and `stateData` are never actually passed at the one call site
// (`<Background />` in ../index.jsx) or read in this component — carried
// over unused from the original so this stays a faithful port.
const Background = () => {
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        width={1447.714}
        height={598.685}
        viewBox="0 0 383.041 158.402"
        className={ `coverage-map__background ${ disableAnimation ? "animation-disabled" : "animate-in" }` }
      >
        <defs>
          <radialGradient
            xlinkHref="#b"
            id="a"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="rotate(3.637 -4170.126 -2603.79) scale(1.8517)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="c"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="d"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="e"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="f"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="g"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="h"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="i"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="j"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="k"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="l"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="m"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="n"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="o"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="p"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="q"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(2.8034 0 0 2.8034 -806.531 -134.028)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="r"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="rotate(3.637 -4170.126 -2603.79) scale(1.8517)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="s"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="rotate(3.637 -4170.126 -2603.79) scale(1.8517)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#v"
            id="t"
            cx={311.95}
            cy={94.38}
            r={46.377}
            fx={311.95}
            fy={94.38}
            gradientTransform="matrix(-2.55105 -1.29518 1.2691 -2.4997 1340.174 906.838)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="y"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="rotate(3.637 -4170.126 -2603.79) scale(1.8517)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="C"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -507.284 -312.135)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="D"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -507.284 -312.135)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="E"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -507.284 -312.135)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="F"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -507.284 -312.135)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="G"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -507.284 -312.135)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="H"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -507.284 -312.135)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="I"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -509.22 -304.724)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="J"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -509.22 -304.724)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="K"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -509.22 -304.724)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="L"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -509.22 -304.724)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="M"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -509.22 -304.724)"
            gradientUnits="userSpaceOnUse"
          />
          <radialGradient
            xlinkHref="#b"
            id="N"
            cx={287.214}
            cy={119.704}
            r={46.377}
            fx={287.214}
            fy={119.704}
            gradientTransform="matrix(3.94937 0 0 3.94937 -509.22 -304.724)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient id="x">
            <stop
              offset={0}
              style={{
                stopColor: "#fff",
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#8f8f8f",
                stopOpacity: 0,
              }}
            />
          </linearGradient>
          <linearGradient id="b">
            <stop
              offset={0}
              style={{
                stopColor: "#8e8e8e",
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#5e5e5e",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient id="v">
            <stop
              offset={0}
              style={{
                stopColor: "#e5e5e5",
                stopOpacity: 0.01351412,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#d3d3d3",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            xlinkHref="#x"
            id="w"
            x1={2400.399}
            x2={2400.399}
            y1={61.533}
            y2={-56.64}
            gradientTransform="translate(-8609.325 267.41) scale(3.41746)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient id="R">
            <stop
              offset={0}
              style={{
                stopColor: "#f8f8f8",
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#fff",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient id="Q">
            <stop
              offset={0}
              style={{
                stopColor: "#000",
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#000",
                stopOpacity: 0,
              }}
            />
          </linearGradient>
          <linearGradient id="O">
            <stop
              offset={0}
              style={{
                stopColor: "#fff",
                stopOpacity: 1,
              }}
            />
            <stop
              offset={1}
              style={{
                stopColor: "#c5c5c5",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <linearGradient
            xlinkHref="#x"
            id="z"
            x1={2400.399}
            x2={2400.399}
            y1={61.533}
            y2={-56.64}
            gradientTransform="translate(-1982.938 36.355) scale(1.0882)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#x"
            id="A"
            x1={2400.399}
            x2={2400.399}
            y1={61.533}
            y2={-56.64}
            gradientTransform="translate(-1982.938 36.355) scale(1.0882)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#x"
            id="B"
            x1={2400.399}
            x2={2400.399}
            y1={61.533}
            y2={-56.64}
            gradientTransform="translate(-1982.938 36.355) scale(1.0882)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#O"
            id="U"
            x1={2400.399}
            x2={2400.399}
            y1={63.444}
            y2={-109.153}
            gradientTransform="matrix(1.0882 0 0 1.18299 -2316.595 85.116)"
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#Q"
            id="T"
            x1={1490.713}
            x2={1490.713}
            y1={80.639}
            y2={187.948}
            gradientUnits="userSpaceOnUse"
          />
          <linearGradient
            xlinkHref="#R"
            id="S"
            x1={1483.181}
            x2={1483.181}
            y1={75.589}
            y2={194.195}
            gradientTransform="matrix(1.1252 0 0 1.21444 -1365.523 -84.871)"
            gradientUnits="userSpaceOnUse"
          />
          <clipPath id="u" clipPathUnits="userSpaceOnUse">
            <path
              d="M437.236 195.255h330.313v105.971H437.236z"
              style={{
                fill: "#fff",
                fillOpacity: 1,
                strokeWidth: 0.451001,
                stopColor: "#000",
              }}
            />
          </clipPath>
        </defs>
        <g transform="translate(-107.86 -8.123)">
          <path
            d="M1650.846 202.167A168.315 168.315 0 0 0 1489.416 81.3a168.315 168.315 0 0 0-161.173 120.867Z"
            style={{
              opacity: 0,
              mixBlendMode: "normal",
              fill: "url(#T)",
              fillOpacity: 1,
              strokeWidth: 0.471469,
              stopColor: "#000",
            }}
            transform="matrix(1.11353 0 0 1.11353 -1359.277 -70.501)"
          />
        </g>
      </svg>

    </div>
  )
}
export default Background;
