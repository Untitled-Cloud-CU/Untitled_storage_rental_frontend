import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import { storeLocations } from './assets/locations';
import type { StoreFeature } from './assets/locations';
import Toolbar from '@mui/material/Toolbar';
import Marker from './components/Marker';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const [stores, setStores] = useState<StoreFeature[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreFeature | null>(null);
  const [total, setTotal] = useState<number>(0);

  const [links, setLinks] = useState<{ next?: string; prev?: string }>({});
  
  const API_BASE = 'http://localhost:8000'; // or your deployed backend

  const fetchPage = async (url: string = `${API_BASE}/addresses?as_geojson=true&limit=5`) => {
	try {
    // Ensure as_geojson=true is in the URL
    if (!url.includes("as_geojson=true")) {
      url += url.includes("?") ? "&as_geojson=true" : "?as_geojson=true";
    }
		const res = await fetch(url);
    console.log("Fetching URL:", url);

		const data = await res.json();
		console.log('Fetched page data:', data);

		setStores(data.features || []);
    setTotal(data.total || 0);

		const nextLink = data.links?.find((l: any) => l.rel === 'next')?.href;
		const prevLink = data.links?.find((l: any) => l.rel === 'prev')?.href;
		// prepend base if needed
		setLinks({
			next: nextLink ? `${API_BASE}${nextLink}` : undefined,
			prev: prevLink ? `${API_BASE}${prevLink}` : undefined,
		});
	} catch (err) {
		console.error('Failed to fetch page:', err);
	}
	};

  useEffect(() => {
    mapboxgl.accessToken = apiKey;

    if (!mapContainerRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-73.9822, 40.7685],
      zoom: 12
    })

    mapRef.current.on('load', () => {
      setMapLoaded(true)
      // fetchLocations();
      fetchPage();
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // for locate button
  useEffect(() => {
    if (!mapRef.current) return;

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    const buttonEl = geolocate.onAdd(mapRef.current); // returns <div class="mapboxgl-ctrl ...">
    const targetContainer = document.getElementById('mapbox-locate-container');
    if (buttonEl && targetContainer) {
      targetContainer.appendChild(buttonEl);

      // Make button height match the search box
      buttonEl.style.height = '35px';
      buttonEl.style.minWidth = '35px'; 
      buttonEl.style.display = 'flex';
      buttonEl.style.alignItems = 'center';
      buttonEl.style.justifyContent = 'center';
    }

    // Cleanup
    return () => {
      if (targetContainer && buttonEl.parentNode === targetContainer) {
        targetContainer.removeChild(buttonEl);
      }
    };
  }, [mapRef.current]);

  // for search box
  const geocoderRef = useRef<MapboxGeocoder | null>(null);
  const searchMarker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || geocoderRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken as string,
      mapboxgl: mapboxgl as any,
      placeholder: "Search for places...",
      proximity: { longitude: -73.9822, latitude: 40.7685 },
      marker: false,
    });

    geocoderRef.current = geocoder;

    const searchContainer = document.getElementById("mapbox-search-container");
    if (searchContainer && mapRef.current) {
      const geocoderEl = geocoder.onAdd(mapRef.current);
      searchContainer.appendChild(geocoderEl);

      // Make container fill the parent container
      geocoderEl.style.width = "100%";
      geocoderEl.style.maxWidth = "35rem";
      geocoderEl.style.flexGrow = "1";

      // Make input fill container
      const inputEl = geocoderEl.querySelector("input") as HTMLInputElement;
      if (inputEl) {
        inputEl.style.width = "100%";
        inputEl.style.boxSizing = "border-box";
      }
    }

    // Listen for search results
    geocoder.on("result", (event) => {
      const coords = event.result.center;
      if (!coords || coords.length !== 2 || !mapRef.current) return;

      // Fly to location
      mapRef.current.flyTo({ center: coords as [number, number], zoom: 13, duration: 1000 });

      // Remove old search marker
      if (searchMarker.current) searchMarker.current.remove();

      // Add a new marker at the search result
      searchMarker.current = new mapboxgl.Marker({ color: "#ff3b4e" })
        .setLngLat(coords as [number, number])
        .addTo(mapRef.current);
    });
  }, [mapRef.current]);



  // fly to selected place
  useEffect(() => {
    if (!selectedStore ) return

    mapRef.current!.flyTo({center: [selectedStore.geometry.coordinates[0], selectedStore.geometry.coordinates[1]], zoom: 13, duration: 1000})

  },[selectedStore])
  
  return (
    <div className='flex flex-col h-screen w-screen'>
      <Toolbar />
      <div className="flex flex-1 h-0">
        <Sidebar 
          stores={stores}
          links={links}
          total={total} 
          fetchPage={fetchPage}
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />
        <div className="w-3/4 h-full">
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
    </div>
  )
}

export default App
