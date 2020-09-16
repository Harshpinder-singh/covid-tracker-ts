import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import showDataOnMap from "./showDataOnMap";

import "./map.css";

interface MapProps {
  countries: any[];
  center: { lat: number; lng: number };
  zoom: any;
}

const Map: React.FC<MapProps> = ({ countries, center, zoom }) => {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetmap</a> contributores'
        />
        {showDataOnMap(countries)}
      </LeafletMap>
    </div>
  );
};

export default Map;
