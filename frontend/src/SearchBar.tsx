import React, { useState } from "react";
import * as HeroIconsOutLine from '@heroicons/react/outline';

export function SearchBar({ query, setQuery }): JSX.Element {
	const [staging, setStaging] = useState('');
	return <div className="flex items-center justify-center py-8 gap-4 w-full max-w-screen-xl mx-auto">
		<form className="flex text-blueGray-600 focus-within:text-gray-900 bg-white rounded-lg group focus-within:ring focus-within:bg-white w-full max-w-screen-md border shadow-lg overflow-hidden"
			onSubmit={e => { e.preventDefault(); setQuery(staging); }}>
			{/* <div className="flex-shrink-0 flex items-center">
				<button className="px-2 h-full w-16 text-sm border-r text-center relative bg-gray-50">
					All
                    <div className="absolute right-0 top-0 h-full flex items-center text-gray-400">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</div>
				</button>
			</div> */}
			<input type="search" results={5} className="px-4 py-2 text-xl w-full focus:outline-none bg-transparent" placeholder="Search" value={staging} onChange={e => setStaging(e.target.value)} autoFocus />
			<button className="py-2 px-4" type="submit">
				<HeroIconsOutLine.SearchIcon className="h-6 w-6 text-blue-600" />
			</button>
		</form>
	</div>;
}
