import React, { useState, useEffect } from "react";
import { useHotkeys } from 'react-hotkeys-hook';
import { cachedFetch } from "./utils/cachedFetch";
import { ResultItem } from "./ResultItem";
import { SearchBar } from "./SearchBar";



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
                setItems(results.sort(sortFiles).filter(x => !x.hidden))
            })
    }, [query])

    return items
}

function App() {
    const [query, setQuery] = useState('')
    const results = useResults(query)

    const [isDark, setIsDark] = useState(true)
    const toggleDark = () => setIsDark(x => !x)
    const darkClassName = isDark ? "dark" : ''

    useHotkeys('ctrl+alt+d', toggleDark)
    useHotkeys('alt+s', () => document.querySelector('input[type="search"]')?.focus())


    return (

        <div className={darkClassName}>
            <div className="h-screen bg-gray-100 flex flex-col gap-4 relative overflow-y-scroll dark:bg-blueGray-900 transition">
                <button className="absolute z-10 w-8 h-8 top-4 right-0 border rounded text-gray-500 border-gray-500 dark:border-blueGray-300 dark:text-blueGray-300 transition" onClick={() => setIsDark(x => !x)}>{isDark ? 'D' : 'L'}</button>
                {/* <div className="fixed inset-0 h-96 bg-gradient-to-br from-cyan-400 to-emerald-400 z-0 shadow-sm transform skew-y-2 -translate-y-12 dark:from-cyan-800 dark:to-cyan-900 transition" onDoubleClick={() => setIsDark(x => !x)} /> */}
                <div className="fixed inset-0 h-96 bg-cyan-400 z-0 shadow-sm transform dark:bg-cyan-800 transition" onDoubleClick={() => setIsDark(x => !x)} />
                <div className="relative z-1">
                    <SearchBar query={query} setQuery={setQuery} />
                    <div className="flex items-start p-4 gap-4 w-full max-w-screen-xl mx-auto">
                        <ResultsList results={results} query={query} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;

function ResultsList({ results, query = '' }) {
    return <div className="flex flex-col flex-grow">
        {/* <pre className="h-40 p-4 text-sm bg-white border shadow rounded overflow-auto mb-4">
            {JSON.stringify(results, null, 2)}
        </pre> */}
        <div className="rounded-md bg-white shadow dark:bg-blueGray-700 transition">
            <table className="table-auto w-full">
                <tbody className="divide-y dark:divide-blueGray-500 transition">
                    {results.map(result => <ResultItem result={result} query={query} />)}
                </tbody>
            </table>
        </div>
    </div>;
}

function sortFiles(a, b) {
    if (a.hidden !== b.hidden) { return a.hidden ? 1 : -1 }
    else { return 0 }
}
