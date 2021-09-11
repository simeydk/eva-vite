import React, { useEffect, useState } from "react";

export function LocationBar({ location, setLocation }: { location: string, setLocation: (x: string) => any }): JSX.Element {
	const [staging, setStaging] = useState<string>(location);
	useEffect(() => setStaging(location),[location])
	
	return <div className="flex items-center justify-center w-full max-w-screen-xl mx-auto">
		<form className="relative group flex items-center  text-blueGray-600  bg-white bg-none shadow-sm hover:shadow-md rounded group focus-within:bg-white focus-within:text-gray-900 w-full focus-within:shadow-lg overflow-hidden dark:bg-blueGray-800 dark:border-blueGray-500 dark:ring-cyan-600 dark:text-gray-300 dark:focus-within:text-gray-50 dark:focus-within:bg-blueGray-700 transition"
			onSubmit={e => { e.preventDefault(); setLocation(staging); }}>
			<label htmlFor="location" className="px-2">
				<img src="https://spoprod-a.akamaihd.net/files/fabric-cdn-prod_20210115.001/assets/item-types/32/folder.svg" alt="" className="w-5 h-5" />
			</label>
			<div className="relative w-full">
				<input id="location" results={5} className="px-2 py-2 w-full text-transparent focus:text-current focus:outline-none bg-transparent" placeholder="Location" value={staging} onChange={e => setStaging(e.target.value)} autoFocus />
			<div className="group-focus-within:hidden absolute inset-y-0 left-0 flex flex-shrink-0">
					<LocationPath location={location} />
				</div>
			</div>
		</form>
	</div>;
}


function Join({ list, delimiter = null }: { list: React.ReactNode[], delimiter: React.ReactNode }): JSX.Element {
	const len = list.length
	return <>{list.map((x, i) => <>{x}{(i < (len - 1)) ? delimiter : null}</>)}</>
}

function LocationPath({ location } = { location: "" }) {
	const bits = location.split('\\').map(x => <span>{x}</span>)
	const delimiter = <span className="px-1">
		<svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
			<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
		</svg>
	</span>
	return <span className="flex items-center leading-none p-2">
		<Join list={bits} delimiter={delimiter} />
	</span>;
}