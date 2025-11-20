import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import type { StoreFeature } from '../assets/locations';

interface SidebarProps {
	stores: StoreFeature[];
	links: { next?: string; prev?: string };
	total: number;
	fetchPage: Function;
	selectedStore: StoreFeature | null;
	setSelectedStore: Function;
}

const Sidebar = ({ stores, links, total, fetchPage, selectedStore, setSelectedStore }: SidebarProps) => {
	const storeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

	// Scroll to active location
	useEffect(() => {
	if (
		selectedStore &&
		storeRefs.current &&
		storeRefs.current[selectedStore.properties.name]
	) {
		const element = storeRefs.current[selectedStore.properties.name];
		if (element) {
		element.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		}
	}
	}, [selectedStore]);

	useEffect(() => {
		console.log('Stores:', stores);
	}, [stores]);

	return (
	<div className="w-1/4 bg-sg-white shadow-xl z-10 flex flex-col h-full ">
		<h2 className="text-sg-dark-blue text-xl font-medium p-4">
		Storage Units Nearby: {total}
		</h2>

		<div className="flex flex-col overflow-y-auto">
			{/* Store List */}
			{stores.map((store) => {
				const isSelected = store.properties.name === selectedStore?.properties.name;
				return (
					<div
						key={store.properties.name}
						ref={(el) => { storeRefs.current[store.properties.name] = el }}
						onClick={() => setSelectedStore(store)}
						className={
							`${isSelected ? 'bg-hover-light-orange' : 'bg-transparent'} hover:bg-hover-light-orange relative flex flex-col p-4 border-b border-sg-outline-grey transition-all duration-200 cursor-pointer `
						}
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
							<Button
								variant="contained"
								sx={{
								width: '100%',
								borderRadius: '5rem',
								backgroundColor: '#ff7528',
								color: '#fcf8f9',
								":hover": { backgroundColor: '#fc6612' },
								textTransform: 'none',
								fontWeight: 600
								}}
								disableElevation
							>
								Check Availability
							</Button>
							</div>
						</div>
					</div>
				);
			})}

			{/* Pagination Buttons */}
			<div className="p-4 flex justify-center">
				<Pagination 
					count={Math.ceil(total / 5)} 
					siblingCount={0} 
					onChange={(e, page) => {
						const offset = (page - 1) * 5; // PAGE_SIZE
						const url = `http://localhost:8000/addresses?limit=5&offset=${offset}&as_geojson=true`;
						fetchPage(url);
					}}
					sx={{
						"& .MuiPaginationItem-root": {
							color: "#ff7528",
						},
						"& .Mui-selected": {
							backgroundColor: "#ff7528 !important",
							color: "white !important",
						},
						"& .MuiPaginationItem-root:hover": {
							backgroundColor: "#ffeadb",
						},
					}}
				/>
			</div>
		</div>
	</div>
	);
};

export default Sidebar;
