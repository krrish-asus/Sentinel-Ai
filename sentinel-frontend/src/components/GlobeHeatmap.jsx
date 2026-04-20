import Globe from "react-globe.gl";
import { useRef, useEffect, useState } from "react";

export default function GlobeHeatmap() {
  const globeRef = useRef();
  const [points, setPoints] = useState([]);

  // 🔥 fake live attack points
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = {
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() * 0.5 + 0.2,
      };

      setPoints((prev) => [...prev.slice(-30), newPoint]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🌍 click country (approx)
  const handleClick = (coords) => {
    if (!coords) return;

    alert(
      `🌍 Location Clicked\nLat: ${coords.lat.toFixed(
        2
      )}, Lng: ${coords.lng.toFixed(2)}`
    );
  };

  return (
    <div className="flex justify-center">
      <Globe
        ref={globeRef}
        height={500}
        width={500}
        backgroundColor="#020617"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        pointsData={points}
        pointAltitude="size"
        pointColor={() => "#00ffff"}
        pointRadius={0.5}
        onGlobeClick={handleClick}
      />
    </div>
  );
}