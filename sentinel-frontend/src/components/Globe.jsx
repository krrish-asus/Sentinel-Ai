import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function GlobeComponent() {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });

  // Load world map data
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  // Auto rotate
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.6;
    }
  }, []);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-xl bg-black">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

        polygonsData={countries.features}
        polygonCapColor={() => "rgba(0, 255, 200, 0.2)"}
        polygonSideColor={() => "rgba(0, 255, 200, 0.05)"}
        polygonStrokeColor={() => "#00ffc8"}

        polygonLabel={({ properties }) => `
          <div style="color:white;">
            <b>${properties.name}</b>
          </div>
        `}

        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  );
}