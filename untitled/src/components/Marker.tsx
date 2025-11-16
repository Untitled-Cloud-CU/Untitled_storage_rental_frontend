import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import type { StoreFeature } from '../assets/locations';

interface MarkerProps {
  feature: StoreFeature;
  map: mapboxgl.Map;
  selectedStore: StoreFeature | null;
  setSelectedStore: Function;
}

const Marker = ({ map, feature, selectedStore, setSelectedStore }: MarkerProps) => {
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const isSelected = feature.properties.name === selectedStore?.properties.name;

  useEffect(() => {
    // Create a Mapbox marker
    markerRef.current = new mapboxgl.Marker({
      color: isSelected ? "#1e3a8a" : "#ff7528", // blue if selected, orange otherwise
    })
      .setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]])
      .addTo(map);

    markerRef.current.getElement().addEventListener("click", () => {
      setSelectedStore(feature);
    });

    return () => {
      markerRef.current?.remove();
    };
  }, [map, feature, isSelected]);

  return null; // no portal needed
};

export default Marker;