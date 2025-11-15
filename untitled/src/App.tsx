import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { storeLocations } from './assets/locations';
import type { StoreFeature } from './assets/locations';
import Toolbar from '@mui/material/Toolbar';
import Marker from './components/Marker';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [stores] = useState<StoreFeature[]>(storeLocations);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreFeature | null>(null)


  useEffect(() => {
    mapboxgl.accessToken = apiKey;

    if (!mapContainerRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-73.9822, 40.7685],
      zoom: 12
    })

    // locate user
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // add search box
    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken as string,
        useBrowserFocus: true,
        mapboxgl: mapboxgl as any
      })
    );

    mapRef.current.on('load', () => {
      setMapLoaded(true)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // fly to selected place
  useEffect(() => {
    if (!selectedStore ) return

    mapRef.current!.flyTo({center: [selectedStore.geometry.coordinates[0], selectedStore.geometry.coordinates[1]], zoom: 13, duration: 1000})

  },[selectedStore])
  
  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <Sidebar 
        stores={stores}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
      />

      {/* Map container */}
      <div className="w-3/4">
        <div id='map-container' className="h-full w-full" ref={mapContainerRef} />
        {mapLoaded && stores.map(location => (
          <Marker 
            key={location.properties.name}
            feature={location} 
            map={mapRef.current!}
            setSelectedStore={setSelectedStore}
            selectedStore={selectedStore}
          />
        ))}
      </div>
    </div>
  )
}

export default App
