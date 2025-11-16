import { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import type { StoreFeature } from '../assets/locations';

interface SidebarProps {
  stores: StoreFeature[]
  selectedStore: StoreFeature | null
  setSelectedStore: Function
}

const Sidebar = ({ stores, selectedStore, setSelectedStore }: SidebarProps) => {

	const storeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

	// Scroll to the active location when it changes (desktop only)
	useEffect(() => {
		if (
			selectedStore &&
			storeRefs.current &&
			storeRefs.current[selectedStore.properties.name]
		) {
			const element = storeRefs.current[selectedStore.properties.name];
			if (element) {
				element.scrollIntoView({
				behavior: 'smooth', // Optionally smooth scrolling
				block: 'start' // Align the element to the top of the container
				});
			}
		}
	}, [selectedStore])

  return (
    <div className="w-1/4 overflow-y-auto bg-sg-white shadow-xl z-10">
      <h2 className="text-sg-dark-blue text-xl font-medium p-4 ">
        Storage Units Nearby: {stores.length}
      </h2>
      
      {stores.map((store) => {
				const isSelected = store.properties.name === selectedStore?.properties.name;
        return (
          <div 
            key={store.properties.name} 
            ref={(el) => {storeRefs.current[store.properties.name] = el}}
            onClick={()=> setSelectedStore(store)}
            className={`${isSelected ? 'bg-hover-light-orange' : 'bg-transparent'} hover:bg-hover-light-orange relative flex flex-col p-4 border-b border-sg-outline-grey transition-all duration-200 cursor-pointer `}
					>    
            <h4 className="mb-2 text-sg-orange text-base font-bold">{store.properties.name}</h4>
            <div className="text-sg-black leading-normal font-light">
							<div>
								<span className="font-bold text-sm">Address: </span>{store.properties.address}
							</div>    
							<div>
								<span className="font-bold text-sm">Phone: </span>{store.properties.phoneFormatted}
							</div>
							<div>
								<span className="font-bold text-sm">Size: </span>{store.properties.size} ft.
							</div>
							<div>
								<span className="font-bold text-sm">Price Per Day: </span>${store.properties.pricePerDay}
							</div>
							<div className='flex justify-center pt-2'>
								<Button variant="contained" sx={{width: '100%', borderRadius: '5rem', backgroundColor: '#ff7528', color: '#fcf8f9', ":hover": { backgroundColor: '#fc6612' }, textTransform: 'none', fontWeight: 600}} disableElevation>Check Availability</Button>
							</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar