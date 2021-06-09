import React, { useState, useEffect } from "react";
import * as HeroIconsOutLine from '@heroicons/react/outline';
import { cachedFetch } from "./utils/cachedFetch";
import { ResultItem } from "./ResultItem";



const API = '/api'

export const openExternal = (path: string) => fetch(`${API}/open?path=${path}`)

function useResults(query: string, initialResults = []) {
    const [items, setItems] = useState(initialResults)
    useEffect(() => {
        if (!query) {
            setItems([])
            return
        }
        const url = `${API}/search?q=${query}`
        cachedFetch(url)
            .then(res => res.json())
            .then(({ results }) => {
                setItems(results.sort(sortFiles))
            })
    }, [query])

    return items
}

function App() {
    const [query, setQuery] = useState('')
    const results = useResults(query)
    return (
        <div className="h-screen bg-gray-100 flex flex-col gap-4 relative overflow-y-scroll">
            <div className="absolute inset-0 h-96 bg-gradient-to-br from-cyan-400 to-emerald-400 z-0 shadow-sm transform skew-y-2 -translate-y-12" />
            <div className="relative z-1">

                <SearchBar query={query} setQuery={setQuery} />

                <div className="flex items-start p-4 gap-4 w-full max-w-screen-xl mx-auto">
                    <ResultsList results={results} />
                </div>
            </div>
        </div>

    );
}

export default App;

function ResultsList({ results }) {
    return <div className="flex flex-col flex-grow">
        {/* <pre className="h-40 p-4 text-sm bg-white border shadow rounded overflow-auto mb-4">
            {JSON.stringify(results, null, 2)}
        </pre> */}
        <div className="rounded-md bg-white shadow overflow-x-auto">
            <table className="table-auto w-full">
                <tbody className="divide-y">
                    {results.map(result => <ResultItem result={result} />)}
                </tbody>
            </table>
        </div>
    </div>;
}

function FilterSideBar() {
    return <div className="flex flex-col rounded-lg bg-white px-4 py-4 w-52 flex-shrink-0 shadow text-gray-500">
        <div className="flex gap-2 items-center px-2 py-2 bg-gradient-to-r border-md rounded-md">
            <div className="flex h-8 w-8 rounded-md overflow-hidden bg-gray-200">
                <div className="flex transform -rotate-12 scale-150">
                    <div className="flex flex-col">
                        <div className="h-4 w-4 bg-gradient-to-br from-cyan-400 to-blue-400" />
                        <div className="h-4 w-4 bg-gradient-to-br from-orange-300 to-red-400" />
                    </div>
                    <div className="flex flex-col">
                        <div className="h-4 w-4 bg-gradient-to-br from-lime-300 to-green-400" />
                        <div className="h-4 w-4 bg-gradient-to-br from-yellow-300 to-orange-400" />
                    </div>
                </div>
            </div>
            <div className="font-medium">All</div>
        </div>
        <div className="flex gap-2 items-center px-2 py-2 bg-gradient-to-r from-blue-200 via-blue-200 to-blue-300 text-blueGray-600 border-md rounded-md">
            <div className="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 bg-gradient-to-br to-blue-400 from-cyan-400">
                <div className="text-xs text-cyan-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="font-medium">Video</div>
        </div>
        <div className="flex gap-2 items-center px-2 py-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 bg-gradient-to-br from-yellow-300 to-orange-400">
                <div className="text-xs text-yellow-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                </div>
            </div>
            <div className="font-medium">Audio</div>
        </div>
        <div className="flex gap-2 items-center px-2 py-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 bg-gradient-to-br from-pink-300 to-fuchsia-400">
                <div className="text-xs text-pink-100">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book-open" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-book-open w-4 h-4"><path fill="currentColor" d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z" className /></svg>
                </div>
            </div>
            <div className="font-medium">Other</div>
        </div>
        <div className="flex gap-2 items-center px-2 py-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 bg-gradient-to-br from-orange-300 to-red-400">
                <div className="text-xs text-red-100">
                    <svg width="24px" height="24px" version="1.1" viewBox="0 0 79.718 34.673" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                        <g transform="translate(-75.415 -84.916)">
                            <path d="m152.17 116.28h0.73448l0.73731 2.4476 0.74894-2.4476h0.74084v3.0593h-0.48578v-2.528l-0.76094 2.528h-0.49953l-0.74683-2.528v2.528h-0.46849zm-2.7616 0h2.395v0.4512h-0.94051v2.6081h-0.51117v-2.6081h-0.94333zm-34.39-29.468-6.1207 23.996s-4.6796-18.012-5.4409-20.567c-0.76164-2.559-2.3283-3.6802-4.5505-3.6802-2.2228 0-3.7924 1.1211-4.5536 3.6802-0.75812 2.5548-5.4391 20.567-5.4391 20.567l-6.1246-23.996h-7.3748s7.0831 25.602 8.0458 28.568c0.74895 2.3142 2.5231 4.2062 5.153 4.2062 3.0071 0 4.4132-2.1922 5.0645-4.2062 0.64417-2.0024 5.2289-18.912 5.2289-18.912s4.5847 16.91 5.2275 18.912c0.65053 2.014 2.057 4.2062 5.0631 4.2062 2.6321 0 4.403-1.8919 5.1566-4.2062 0.96062-2.9651 8.0388-28.568 8.0388-28.568zm25.286 32.527h6.9818v-22.583h-6.9818zm-0.67669-30.479c0 2.1766 1.8362 3.9434 4.0908 3.9434 2.346 0 4.1836-1.7304 4.1836-3.9434 0-2.2137-1.8376-3.9479-4.1836-3.9479-2.2546 0-4.0908 1.7692-4.0908 3.9479m-13.51 30.479h6.9797v-22.583h-6.9797zm-0.67871-30.479c0 2.1766 1.8327 3.9434 4.0887 3.9434 2.3446 0 4.1857-1.7304 4.1857-3.9434 0-2.2137-1.8412-3.9479-4.1857-3.9479-2.256 0-4.0887 1.7692-4.0887 3.9479" fill="currentColor" />
                        </g>
                    </svg>
                    {/* <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gamepad" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-5 w-5"><path fill="currentColor" d="M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z" class=""></path></svg> */}
                </div>
            </div>
            <div className="font-medium">Games</div>
        </div>
        {/* <div class="flex gap-2 items-b2-2 py-2">
<div class="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 bg-gradient-to-br from-teal-300 to-cyan-400"></div>
<div class=" font-medium">Filename</div>
</div> */}
        <div className="flex gap-2 items-center px-2 py-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 bg-gradient-to-br from-lime-300 to-emerald-400">
                <div className="text-xs text-green-100">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tools" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4"><path fill="currentColor" d="M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z" className /></svg>
                </div>
            </div>
            <div className="font-medium">Software</div>
        </div>
        {/* <div class="flex gap-2 items-center px-2 py-2">
<div class="flex items-center justify-center h-8 w-8 rounded-md ring-blue-500 ring-offset-2 ring-offset-gray-100 bg-gradient-to-br from-gray-300 to-gray-400"></div>
<div class="text-gray-500 font-medium">Filename</div>
</div> */}
    </div>;
}

function SearchBar({ query, setQuery }): JSX.Element {
    const [staging, setStaging] = useState('')
    return <div className="flex items-start px-4 py-8  gap-4 w-full max-w-screen-xl mx-auto">
        <div className="w-52 flex-shrink-0" />
        <form className="flex text-blueGray-600 focus-within:text-gray-900 bg-white rounded-lg group focus-within:ring focus-within:bg-white w-full max-w-screen-md border shadow-lg overflow-hidden"
            onSubmit={e => { e.preventDefault(); setQuery(staging) }} >
            <div className="flex-shrink-0 flex items-center">
                <button className="px-2 h-full w-16 text-sm border-r text-center relative bg-gray-50">
                    All
                    <div className="absolute right-0 top-0 h-full flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button></div>
            <input type="search" results={5} className="px-2 py-2 text-xl w-full focus:outline-none bg-transparent" placeholder="Search" value={staging} onChange={e => setStaging(e.target.value)} />
            <button className="p-2" type="submit">
                <HeroIconsOutLine.SearchIcon className="h-6 w-6 text-blue-600" />
            </button>
        </form>
    </div>;
}

function sortFiles(a, b) {
    if (a.hidden !== b.hidden) { return a.hidden ? 1 : -1 }
    else { return 0 }
}
