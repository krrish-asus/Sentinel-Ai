import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = ({ logs }) => {

  const points = logs.map((log) => ({
    coordinates: [
      Math.random() * 360 - 180,
      Math.random() * 140 - 70
    ],
    color:
      log.level === "high" ? "red" :
      log.level === "medium" ? "orange" :
      "green",
  }));

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#0f172a" stroke="#00ffff" />
          ))
        }
      </Geographies>

      {points.map((p, i) => (
        <Marker key={i} coordinates={p.coordinates}>
          <circle r={6} fill={p.color} />
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default WorldMap;