"use client";

import GalaxyMap from "@/components/GalaxyMap";
import { Fragment, useEffect, useState } from "react";

export default function Map() {
  const [planets, setPlanets] = useState(null);
  const [spacelanes, setSpacelanes] = useState(null);
  useEffect(() => {
    async function fetchPlanets() {
      const data = await fetch("/api/planets");
      const planet_list = await data.json();
      setPlanets(planet_list);
    }
    async function fetchSpacelanes() {
      const data = await fetch("/api/spacelanes");
      const spacelane_list = await data.json();
      setSpacelanes(spacelane_list);
    }
    fetchPlanets();
    fetchSpacelanes();
  }, []);

  if (!planets || !spacelanes) return <div></div>;

  return (
    <Fragment>
    <GalaxyMap
      planets={planets}
      spacelanes={spacelanes}
      dimensions={{ minX: -12000, maxX: 12000, minY: -12000, maxY: 12000 }}
      zoom={{ initial: 80, min: 0 }}
    />
    <p>Star Wars and all associated names are copyright Lucasfilm and Disney</p>
    </Fragment>
  );
}
