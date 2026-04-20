import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useState } from "react";

function Earth({ setCountry }) {
  return (
    <Sphere
      args={[2.5, 64, 64]}
      onClick={(e) => {
        const x = e.point.x;
        setCountry(x > 0 ? "Asia" : "America");
      }}
    >
      {/* SAFE MATERIAL (NO TEXTURE → NO CRASH) */}
      <meshStandardMaterial color="#00ffff" />
    </Sphere>
  );
}

export default function Globe() {
  const [country, setCountry] = useState("");

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* COUNTRY LABEL */}
      {country && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#00ffff",
          }}
        >
          🌍 {country}
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 6] }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <Earth setCountry={setCountry} />

        <OrbitControls autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}