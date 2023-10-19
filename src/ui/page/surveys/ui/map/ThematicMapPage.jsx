import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const ThematicMapPage = () => {
  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiYW5hcjI2MjciLCJhIjoiY2xueGN1azdpMGZheTJrbGVvbndxMnBqYyJ9.Nft7lgWBldqlwK62Gfqpbw"; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [28.9784, 41.0082], // Istanbul coordinates
      zoom: 10,
    });

    map.on("load", () => {
      map.addSource("istanbul-nufus", {
        type: "geojson",
        data: "../../../../../../src/data/istanbul-nufus-geojson.geojson", // Replace with the correct path to your geojson file
      });

      map.addLayer({
        id: "istanbul-nufus-layer",
        type: "fill",
        source: "istanbul-nufus",
        layout: {},
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "Nufus_2020"],
            0,
            "yellow", // Assuming 0 is the minimum population
            500000,
            "red", // Assuming 500,000 is the maximum population
          ],
          "fill-opacity": 0.8,
        },
      });
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default ThematicMapPage;
