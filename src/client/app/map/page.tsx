"use client";

import GalaxyMap from "@/components/GalaxyMap";
import { useEffect, useState } from "react";

export default function Map() {
    const [planets, setPlanets] = useState(null);
    useEffect(() => {
        async function fetchPlanets() {
            const data = await fetch("/api/planets")
            console.log(data);
            const planet_list = await data.json();
            console.log(planet_list);
            setPlanets(planet_list);
        };
        fetchPlanets();
    }, [])
    
    if (!planets) return(
        <div>
        </div>
    );

    return <GalaxyMap planets={planets} routes={[]}/>
  }