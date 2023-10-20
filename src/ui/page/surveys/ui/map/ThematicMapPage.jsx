import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import geojsonData from "../../../../../../public/data/istanbul-nufus-geojson.json"; // Directly import the renamed .json file

const ThematicMapPage = () => {
  useEffect(() => {
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
        data: geojsonData, // Use the directly imported data
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
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default ThematicMapPage;
