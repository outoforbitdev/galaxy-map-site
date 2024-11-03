"use client";

import GalaxyMap from "@/components/GalaxyMap";
import { useEffect, useState } from "react";

export default function Map() {
  const [planets, setPlanets] = useState(null);
  useEffect(() => {
    async function fetchPlanets() {
      const data = await fetch("/api/planets");
      const planet_list = await data.json();
      setPlanets(planet_list);
    }
    fetchPlanets();
  }, []);

  if (!planets) return <div></div>;

  return (
    <GalaxyMap
      planets={planets}
      routes={[]}
      dimensions={{ minX: -12000, maxX: 12000, minY: -12000, maxY: 12000 }}
      zoom={{initial: 80, min: 0}}
    />
  );
}
