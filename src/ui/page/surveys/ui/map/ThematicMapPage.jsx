import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const ThematicMapPage = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    // Fetch the geojson data
    fetch("../../../../../../public/data/istanbul-nufus-geojson.geojson") // Adjust the path if needed
      .then((response) => response.json())
      .then((data) => {
        setGeojsonData(data);
      });
  }, []);

  useEffect(() => {
    if (!geojsonData) return; // Wait until geojson data is loaded

    mapboxgl.accessToken = "pk.eyJ1IjoiYW5hcjI2MjciLCJhIjoiY2xueGN1azdpMGZheTJrbGVvbndxMnBqYyJ9.Nft7lgWBldqlwK62Gfqpbw";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [28.9784, 41.0082], // Istanbul coordinates
      zoom: 10,
    });

    map.on("load", () => {
      map.addSource("istanbul-nufus", {
        type: "geojson",
        data: geojsonData,
      });

      map.addLayer({
        id: "istanbul-nufus-layer",
        type: "fill",
        source: "istanbul-nufus",
        layout: {},
        paint: {
          "fill-color": ["interpolate", ["linear"], ["get", "Nufus_2020"], 0, "yellow", 500000, "red"],
          "fill-opacity": 0.8,
        },
      });
    });
  }, [geojsonData]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default ThematicMapPage;
