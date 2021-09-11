import React, { useState } from "react";
import * as HeroIconsOutLine from '@heroicons/react/outline';

export function SearchBar({ query, setQuery }): JSX.Element {
	const [staging, setStaging] = useState('');
	return <div className="flex items-center justify-center py-8 gap-4 w-full max-w-screen-xl mx-auto">
		<form className="flex text-blueGray-600 focus-within:text-gray-900 bg-white rounded-lg group focus-within:ring focus-within:bg-white w-full max-w-screen-md border shadow-lg overflow-hidden dark:bg-blueGray-800 dark:border-blueGray-500 dark:ring-cyan-600 dark:text-gray-300 dark:focus-within:text-gray-50 dark:focus-within:bg-blueGray-700 transition"
			onSubmit={e => { e.preventDefault(); setQuery(staging); }}>
			<input type="search" results={5} className="px-4 py-2 text-xl w-full focus:outline-none bg-transparent" placeholder="Search" value={staging} onChange={e => setStaging(e.target.value)} autoFocus />
			<button className="py-2 px-4" type="submit">
				<HeroIconsOutLine.SearchIcon className="h-6 w-6 text-blue-600 dark:text-blue-200 transition" />
			</button>
		</form>
	</div>;
}