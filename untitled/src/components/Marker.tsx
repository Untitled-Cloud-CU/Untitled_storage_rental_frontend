import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";
import mapboxgl from 'mapbox-gl';
import PlaceIcon from '@mui/icons-material/Place';
import type { StoreFeature } from '../assets/locations';

interface MarkerProps {
  feature: StoreFeature
  map: mapboxgl.Map
	selectedStore: StoreFeature | null
  setSelectedStore: Function
}

const Marker = ({ map, feature, selectedStore, setSelectedStore }: MarkerProps) => {
	const { geometry } = feature

	const contentRef = useRef(document.createElement("div"));
	const markerRef = useRef<mapboxgl.Marker | null>(null);
	const isSelected = feature.properties.name === selectedStore?.properties.name;
	
	useEffect(() => {
		markerRef.current = new mapboxgl.Marker(contentRef.current)
			.setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
			.addTo(map)

		return () => {
			markerRef.current?.remove()
		}
	}, [])

	return (
		<>
			{createPortal(
				<PlaceIcon
					onClick={() => setSelectedStore(feature)}
					className={`
						cursor-pointer transition
						${isSelected ? "text-sg-dark-blue" : "text-sg-orange"}
					`}
					style={{ fontSize: 40 }}
				/>,
				contentRef.current
			)}
		</>
	)
}

export default Marker